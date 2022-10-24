
/******* INTEGRANTES *******/
// * Jesus Rangel
// * Bastian Ceron
// * David Zegarra
// * Alexander Millano




let btnViewProducts = document.getElementById("btnViewProducts");
let btnViewProductsM = document.getElementById("btnViewProductsM");
let btnPaginacion = document.getElementById("btnPaginacion");
let btnAnterior = document.getElementById("btnAnterior");
let btnSiguiente = document.getElementById("btnSiguiente");

const isOk = true;
let limite = 20;
let pagina = 0;
const productos = [
  {
    id: 1,
    name: "Lentes de Sol Calvin Klein Plateado",
    price: 100,
    stock: 10,
    url: "https://www.schilling.cl/media/catalog/product/cache/f0863b93965a9ef2fa85fc190d594c75/2/0/2048319-1.jpg",
  },
  {
    id: 2,
    name: "Lentes de Sol Harley Davidson Gris",
    price: 200,
    stock: 20,
    url: "https://www.schilling.cl/media/catalog/product/cache/f0863b93965a9ef2fa85fc190d594c75/2/0/2050857-1.jpg",
  },
  {
    id: 3,
    name: "Lentes de Sol Ferraro  Negro",
    price: 300,
    stock: 30,
    url: "https://www.schilling.cl/media/catalog/product/cache/f0863b93965a9ef2fa85fc190d594c75/2/0/2045989-1.jpg",
  },
  {
    id: 4,
    name: "Lentes de Sol Ferraro Azul",
    price: 300,
    stock: 30,
    url: "https://www.schilling.cl/media/catalog/product/cache/f0863b93965a9ef2fa85fc190d594c75/2/0/2045947-1_1.jpg",
  },
  {
    id: 5,
    name: "Lentes de Sol Timberland Gris",
    price: 300,
    stock: 30,
    url: "https://www.schilling.cl/media/catalog/product/cache/f0863b93965a9ef2fa85fc190d594c75/2/0/2050946-1.jpg",
  },
  {
    id: 6,
    name: "Lentes de Sol Benetton Gris",
    price: 300,
    stock: 30,
    url: "https://www.schilling.cl/media/catalog/product/cache/f0863b93965a9ef2fa85fc190d594c75/2/0/2052508-1_1.jpg",
  },
  {
    id: 7,
    name: "Lentes de Sol Pepe Jeans Negro",
    price: 300,
    stock: 30,
    url: "https://www.schilling.cl/media/catalog/product/cache/f0863b93965a9ef2fa85fc190d594c75/2/0/2052396-1_1.jpg",
  },
  {
    id: 8,
    name: "Lentes de Sol Lacoste Negro",
    price: 300,
    stock: 30,
    url: "https://www.schilling.cl/media/catalog/product/cache/f0863b93965a9ef2fa85fc190d594c75/2/0/2048107-1.jpg",
  },
  {
    id: 9,
    name: "Lentes de Sol Nike",
    price: 300,
    stock: 30,
    url: "https://www.schilling.cl/media/catalog/product/cache/f0863b93965a9ef2fa85fc190d594c75/2/0/2032885-1_1.jpg",
  },
  {
    id: 10,
    name: "Lentes de Sol U-Bahn Negro",
    price: 300,
    stock: 30,
    url: "https://www.schilling.cl/media/catalog/product/cache/f0863b93965a9ef2fa85fc190d594c75/2/0/2034146-1_1.jpg",
  },
];

const customFetch = (time, task) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (isOk) {
        resolve(task);
      } else {
        reject("Error");
      }
    }, time);
  });
};

const createCard = (items) => {
  let body = "";
  items.map((items, index) => {
    body += `
    <div id="${index + 1}" class="card">
      <div class="card-header">
        <p class="card-price">$${items.price}</p>
      </div>
      <div class="card-body">
        <div class="card-img">
          <img src="${items.url}" alt="img" />
        </div>
        <div class="box-text">
          <p class="card-text">${items.name}</p>
        </div>
      </div>
    </div>
    `;
  });
  return body;
};

const mostrarProductos = () => {
  customFetch(2000, productos).then((data) => {
    let body = createCard(data);
    btnPaginacion.classList.add("hidden");
    document.getElementById("mainCards").innerHTML = body;
  });
};

const getProductos = async () => {
  let url = `https://api.mercadolibre.com/sites/MLC/search?q=laptop&offset=${pagina}&limit=${limite}`;
  try {
    const response = await fetch(url);
    const data = await response.json();   
    if (data.error) {
      document.getElementById(
        "mainCards"
      ).innerHTML = `<p>Error: ${data.error}</p>`;
    } else {
      return data;
    }
  } catch (error) {
    console.log(error);
  }
};

const formatterPeso = new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
  minimumFractionDigits: 0,
});

const mostrarProductosM = async () => {
  pagina >= 1
    ? btnAnterior.classList.remove("hidden")
    : btnAnterior.classList.add("hidden");

  const data = await getProductos();
  let body = "";
  btnPaginacion.classList.add("hidden");
  switch (data.results.length) {
    case 0:
      document.getElementById(
        "mainCards"
      ).innerHTML = `<p>No se encotraron resultados para tu busqueda</p>`;
      break;

    default:
      data.results.map((items, index) => {
        body += `
        <div id="${index + 1}" class="card">
          <div class="card-header">
            <p class="card-price">${formatterPeso.format(items.price)}</p>
          </div>
          <div class="card-body">
            <div class="card-img">
              <img src="${items.thumbnail}" alt="img" />
            </div>
            <div class="box-text">
              <p class="card-text">${items.title}</p>
            </div>
          </div>
        </div>
        `;
      });
      document.getElementById("mainCards").innerHTML = body;
      btnPaginacion.classList.remove("hidden");

      break;
  }
};

btnViewProducts.addEventListener("click", mostrarProductos);
btnViewProductsM.addEventListener("click", mostrarProductosM);

btnSiguiente.addEventListener("click", () => {
  pagina += 1;
  mostrarProductosM();
  (function smoothscroll() {
    let currentScroll =
      document.documentElement.scrollTop || document.body.scrollTop;
    if (currentScroll > 0) {
      window.requestAnimationFrame(smoothscroll);
      window.scrollTo(0, currentScroll - currentScroll / 5);
    }
  })();
});

btnAnterior.addEventListener("click", () => {
  if (pagina >= 1) {
    pagina -= 1;
    mostrarProductosM();
  }
});

// mostrarProductos();

