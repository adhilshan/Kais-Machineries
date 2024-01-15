
function decryptConfig(encryptedConfig) {
    let decryptedConfig = {};

    for (const encryptedKey in encryptedConfig) {
        if (encryptedConfig.hasOwnProperty(encryptedKey)) {
            const key = atob(encryptedKey);
            const value = atob(encryptedConfig[encryptedKey]);
            decryptedConfig[key] = value;
        }
    }

    return decryptedConfig;
}
const firebaseConfig = decryptConfig({ "YXBpS2V5": "QUl6YVN5Q1YxWjgtRVpXZFV3UG5zQWlQclJuNmhTY2J0OV9Bbkhz", "YXV0aERvbWFpbg==": "a2Fpc29ubGluZS5maXJlYmFzZWFwcC5jb20=", "cHJvamVjdElk": "a2Fpc29ubGluZQ==", "c3RvcmFnZUJ1Y2tldA==": "a2Fpc29ubGluZS5hcHBzcG90LmNvbQ==", "bWVzc2FnaW5nU2VuZGVySWQ=": "MTAzODM4NDU2NjEyNg==", "YXBwSWQ=": "MToxMDM4Mzg0NTY2MTI2OndlYjowYTJkYWIyMmE5MGM3NTAwNjZiYjdm", "bWVhc3VyZW1lbnRJZA==": "Ry0zMzZTVEtDNUhR" });
const app = firebase.initializeApp(firebaseConfig);
const db = app.firestore();

const productRef = db.collection("site/machineries/products");

var productWrapper = document.getElementById('pr-lists');
productRef
    .limit(4)
    .get()
    .then((querySnapshot) => {
        document.getElementById('buffer').style.display = 'none';
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            var product_template = `
                    <div class="product-wrap col-xl-3 col-lg-4 col-md-6 col-sm-6 mt-20">
                        <div class="product-img mb-15">
                            <a href="/details/?id=${doc.id}"><img
                                    src="${data.images[0]}"
                                    alt="product"></a>
                        </div>
                        <div class="product-content">
                            <span>Mill</span>
                            <h4><a href="/details/?id=${doc.id}">${data.title}</a></h4>
                            <div class="price-addtocart">
                                <div class="product-price">
                                    <span>₹${data.price}</span>
                                </div>
                                <div style="padding:8px 20px; background:#242424; color:#FFF; border-radius:4px;">
                                    <a title="Buy Now" href="#" style="color: #FFF;" href="https://api.whatsapp.com/send?phone=+918089718880&text=Hi, i would like to buy some machineries from Kais Machineries">+ Buy Now</a>
                                </div>
                            </div>
                        </div>
                    </div>
            `;


            productWrapper.innerHTML = product_template + productWrapper.innerHTML;
        });
    })
    .catch((error) => {
        document.getElementById('error-alert').style.top = '50px';
    });

const sliderRef = db.collection("site/machineries/headerslides");
var maxSlides = 1;
sliderRef
    .get()
    .then((querySnapshot) => {
        maxSlides = querySnapshot.size;
        var rn = Math.floor(Math.random() * maxSlides) + 1;
        sliderRef
            .limit(rn)
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    const data = doc.data();

                    document.getElementById('img-src').src = data.image;
                    document.getElementById('caption-txt').textContent = data.caption;
                    document.getElementById('title-txt').textContent = data.title;
                    document.getElementById('desc-txt').textContent = data.description;
                    document.getElementById('shop-btn').href = '/details/?id=' + data.productid;
                });
            })
            .catch((error) => {
            });

    })
    .catch((error) => {
        document.getElementById('error-alert').style.top = '50px';
    });



