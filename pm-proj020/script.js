let modalQtdade;

const q = (el) => document.querySelector(el);
const qa = (el) => document.querySelectorAll(el);

pizzaJson.map((item, index) => {
    let pizzaItem = q('.models .pizza-item').cloneNode(true);
    
    pizzaItem.setAttribute('data-key', index);
    pizzaItem.querySelector('.pizza-item--img img').src = item.img;
    pizzaItem.querySelector('.pizza-item--price').innerHTML = `R$ ${item.price.toFixed(2)}`;
    pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name;
    pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description;
    
    // Funcao para abrir o modal da pizza clicada.
    pizzaItem.querySelector('a').addEventListener('click', (e) => {
        e.preventDefault();
        let key = e.target.closest('.pizza-item').getAttribute('data-key');
        modalQtdade = 1;

         // Aplicando animacao ao abrir o modal.
         q('.pizzaWindowArea').style.opacity = 0;
         q('.pizzaWindowArea').st
             q('.pizzaWindowArea').style.opacity = 1;
         }, 200);
yle.display = 'flex';
         setTimeout(() => {
        // Preenchendo as informacoes dentro do modal da pizza clicada 
        q('.pizzaBig img').src = pizzaJson[key].img;
        q('.pizzaInfo h1').innerHTML = pizzaJson[key].name;
        q('.pizzaInfo--desc').innerHTML = pizzaJson[key].description;
        q('.pizzaInfo--actualPrice').innerHTML = `R$ ${pizzaJson[key].price.toFixed(2)}`;
        q('.pizzaInfo--size.selected').classList.remove('selected');
        qa('.pizzaInfo--size').forEach((size, sizeIndex) => {
            if(sizeIndex == 2) {
                size.classList.add('selected');
            }
            size.querySelector('span').innerHTML = pizzaJson[key].sizes[sizeIndex];
        })
    });

    q('.pizzaInfo--qt').innerHTML = modalQtdade;

    q('.pizza-area').append(pizzaItem);
});