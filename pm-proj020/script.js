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

         // Aplicando animacao ao abrir o modal.
         q('.pizzaWindowArea').style.opacity = 0;
         q('.pizzaWindowArea').style.display = 'flex';
         setTimeout(() => {
             q('.pizzaWindowArea').style.opacity = 1;
         }, 200);

        // Preenchendo as informacoes dentro do modal da pizza clicada 
        q('.pizzaBig img').src = pizzaJson[key].img;
        q('.pizzaInfo h1').innerHTML = pizzaJson[key].name;
        q('.pizzaInfo--desc').innerHTML = pizzaJson[key].description;
    });

    q('.pizza-area').append(pizzaItem);
});