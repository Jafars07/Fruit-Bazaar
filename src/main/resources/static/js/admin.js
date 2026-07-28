let allProducts = [];


// IMAGE PREVIEW
const imageInput = document.getElementById("imageFile");
const previewImage = document.getElementById("previewImage");

imageInput.addEventListener("change", function () {

    const file = this.files[0];

    if (file) {
        previewImage.src = URL.createObjectURL(file);
    }
});


// LOAD PRODUCTS
function loadProducts() {
	
	document.getElementById("productTable").innerHTML=
	`
	<tr>
	<td colspan="7">

	<div class="text-center py-4">

	<div class="spinner-border text-success"></div>

	<p class="mt-2">Loading Products...</p>

	</div>

	</td>
	</tr>
	`;

    fetch("/api/products/all")
        .then(res => res.json())
        .then(data => {

            allProducts = data;

            renderProducts(data);

            updateDashboard(data);
        });
}


// RENDER PRODUCTS
function renderProducts(products) {

    const table = document.getElementById("productTable");

    table.innerHTML = "";

    products.forEach(p => {

        table.innerHTML += `
        <tr>

            <td>${p.id}</td>

            <td>
			<img src="${p.imageUrl}"
			     class="table-img"
			     onerror="this.onerror=null;this.src='/images/no-image.jpg'">
            </td>

            <td>${p.name}</td>

            <td>₹${p.price}</td>

            <td>${p.unit}</td>

			<td>

			    ${p.available
			        ? `<span class="badge bg-success">
			              Available
			           </span>`
			        : `<span class="badge bg-danger">
			              Out Of Stock
			           </span>`
			    }

			    ${p.featured
			        ? `<span class="badge bg-warning ms-1">
			              Featured
			           </span>`
			        : ""
			    }

			</td>

            <td>

                <button class="btn btn-warning btn-sm me-2"
                        onclick="editProduct(${p.id})">

                    Edit

                </button>

                <button class="btn btn-danger btn-sm"
                        onclick="deleteProduct(${p.id})">

                    Delete

                </button>

            </td>

        </tr>
        `;
    });
	setTimeout(() => {

	    document.querySelectorAll("#productTable tr")
	    .forEach((row,index)=>{

	        row.style.opacity="0";
	        row.style.transform="translateY(20px)";

	        setTimeout(()=>{

	            row.style.transition=".4s";

	            row.style.opacity="1";
	            row.style.transform="translateY(0)";

	        },index*50);

	    });

	},100);
}


// DASHBOARD COUNTS
function animateCounter(id,value){

    let start=0;

    const element=document.getElementById(id);

    const interval=setInterval(()=>{

        start++;

        element.innerText=start;

        if(start>=value){
            clearInterval(interval);
        }

    },50);
}

function updateDashboard(products){

    const total = products.length;

    const available =
        products.filter(
            p => p.available === true
        ).length;

    const unavailable =
        products.filter(
            p => p.available === false
        ).length;

    document.getElementById("totalProducts").innerText =
        total;

    document.getElementById("availableProducts").innerText =
        available;

    document.getElementById("unavailableProducts").innerText =
        unavailable;
}


// SEARCH
function filterProducts() {

    const search =
        document.getElementById("searchBox")
        .value
        .toLowerCase();

    const filtered = allProducts.filter(p =>
        p.name.toLowerCase().includes(search)
    );

    renderProducts(filtered);
}


// ADD / UPDATE PRODUCT
document.getElementById("productForm")
.addEventListener("submit", function(e) {

    e.preventDefault();

    const saveBtn = document.getElementById("saveBtn");

    saveBtn.disabled = true;

    saveBtn.innerHTML = `
        <span class="spinner-border spinner-border-sm"></span>
        Saving...
    `;

    const formData = new FormData();

    formData.append(
        "name",
        document.getElementById("name").value
    );

    formData.append(
        "price",
        document.getElementById("price").value
    );

    formData.append(
        "unit",
        document.getElementById("unit").value
    );

    formData.append(
        "available",
        document.getElementById("available").checked
    );
	
	formData.append(
	    "featured",
	    document.getElementById("featured").checked
	);

    const imageFile =
        document.getElementById("imageFile").files[0];

    if(imageFile) {
        formData.append("imageFile", imageFile);
    }

    let url = "/api/products";
    let method = "POST";

    if(window.editId) {

        url = `/api/products/${window.editId}`;

        method = "PUT";
    }

    fetch(url, {

        method: method,

        body: formData
    })

    .then(res => {

        if(!res.ok) {
            throw new Error("Save failed");
        }

        return res.json();
    })

    .then(() => {

        document.getElementById("msg").innerHTML =
            `<span class="text-success fw-bold">
                Product Saved Successfully!
             </span>`;

        document.getElementById("productForm").reset();

        previewImage.src =
		    "/images/no-image.jpg";

        window.editId = null;

        loadProducts();
    })

    .catch(() => {

        document.getElementById("msg").innerHTML =
            `<span class="text-danger fw-bold">
                Upload Failed
             </span>`;
    })

    .finally(() => {

        saveBtn.disabled = false;

        saveBtn.innerHTML = "Save Product";
    });

});

// DELETE PRODUCT
function deleteProduct(id) {

	if (!confirm("⚠️ Are you sure you want to delete this product?")) {
	    return;
	}

    fetch(`/api/products/${id}`, {
        method: "DELETE"
    })

    .then(() => {
        loadProducts();
    });
}


// EDIT PRODUCT
function editProduct(id) {

    fetch(`/api/products/${id}`)

        .then(res => res.json())

        .then(p => {

            document.getElementById("name").value =
                p.name;

            document.getElementById("price").value =
                p.price;

            document.getElementById("unit").value =
                p.unit;

            document.getElementById("available").checked =
				Boolean(p.available);
				
			document.getElementById("featured").checked =
			 p.featured;

            previewImage.src = p.imageUrl;

            window.editId = id;

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
}




window.addEventListener("load", () => {

    document.querySelectorAll(".dashboard-card")
    .forEach((card,index)=>{

        card.style.opacity="0";
        card.style.transform="translateY(40px)";

        setTimeout(()=>{

            card.style.transition=".6s";

            card.style.opacity="1";
            card.style.transform="translateY(0)";

        },index*150);

    });

});

/*HAmaberger return state*/
document.addEventListener("click", function (event) {

    const navbarCollapse =
        document.getElementById("navBar");

    const navbarToggler =
        document.querySelector(".navbar-toggler");

    if (
        navbarCollapse.classList.contains("show") &&
        !navbarCollapse.contains(event.target) &&
        !navbarToggler.contains(event.target)
    ) {

        bootstrap.Collapse
            .getInstance(navbarCollapse)
            .hide();
    }
});

// INITIAL LOAD
loadProducts();