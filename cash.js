window.addEventListener("DOMContentLoaded", () => {

    /*on force la couleur noir sur les input*/
    document.getElementById("entry").style.color = "black";
    document.getElementById("result").style.color = "black";

    /*on sélectionne tous les boutons d'entrée et tous les boutons de sortie*/
    const entry_currency = document.querySelectorAll(".butt_enter");
    const output_currency = document.querySelectorAll(".butt_output");

    /*on récupère les deux div de conversion par leur Id 'entry' et 'result'*/
    const entry_div = document.getElementById("entry");
    const result_div = document.getElementById("result");

    /*on défini des variables pour stocker les devises sélectionné par défaut dans les deux div 'entry_div' et 'output_div'*/
    let selectCurrencyEntry = "euro";
    let selectCurrencyOutput = "dollar";

    /*l'objet de conversion*/
    const money = {
        dollar: 0.84,
        euro: 1,
        livre: 1.14,
        bitcoin: 40000,
    }

    /*on ajoute une écoute d'évènement pour tous les boutons d'entrée et de sortie*/
    entry_currency.forEach(button => {
        button.addEventListener("click", function(){
            selectCurrency(this, "entry");
        });
    });
    output_currency.forEach(button => {
        button.addEventListener("click", function(){
            selectCurrency(this, "result");
        });
    });

    /*on crée une fonction pour sélectionner de type de devise*/
    function selectCurrency(element, type){ //'element' représente le bouton cliqué et 'type' représente le type de conversion
        /*on récupère la valeur de l'attribut 'data-devise' du bouton cliqué*/
        const currency = element.dataset.devise; 

        /*on vérifie si le bouton provient de l'entrée utilisateur ou du résultat*/
        if (type === "entry"){
            /*on met à jour la devise sélectionné*/
            selectCurrencyEntry = currency;
            /*on met à jour la classe 'active' pour le bouton sélectionné*/
            entry_currency.forEach(button => {
                button.classList.remove("active");
            });
            element.classList.add("active");
        } else {
            /*on met à jour la devise sélectionné*/
            selectCurrencyOutput = currency;
            /*on met à jour la classe 'active' pour le bouton sélectionné*/
            output_currency.forEach(button => {
                button.classList.remove("active");
            });
            element.classList.add("active");
        }
        /*on appelle la fonction de conversion pour mettre à jour le résultat*/
        convertCurrency();
    }

    /*on crée une fonction de conversion*/
    function convertCurrency(){
        /*on récupère l'input avec quantité en valeur décimale de l'input*/
        const quantity = parseFloat(entry_div.value.trim());
        /*on vérifie si la saisie est un nombre et qu'il n'est pas négatif et on affiche une alerte pour entrer un nombre valide*/
        if (isNaN(quantity) || quantity < 0) {
            alert("Please enter a valid number");
            result_div.value = ""; /*on vide le résultat*/
            return; /*on sort de la fonction*/
        }
        /*on vérifie que la selection de devise dans les deux div n'est pas la même*/
        if (selectCurrencyEntry === selectCurrencyOutput){
            alert("Error: The selected input and output currencies are the same");
            result_div.value = ""; /*on vide le résultat*/
            return; /*on sort de la fonction*/
        }

        /*on récupère le taux de chaque devise et on stock la monnaie à convertir 'entry_device'/'devise_entrée' et on stock la monnaie que l'on converti 'output_device'/'devise_sortie'*/
        const entry_device = money[selectCurrencyEntry];
        const output_device = money[selectCurrencyOutput];

        /*on effectue la conversion*/
        const result = (entry_device * quantity) / output_device;

        /*on affiche le résultat dans la div out_div avec 2 décimales*/
        result_div.value = result.toFixed(2);

        result_div.style.color = "black"; //la couleur du texte reste noir
    }

    /*appel de la fonction convert à la modification de l'input et au changement de la devise dans la div 'enter_div' et/ou 'result_div'*/
    entry_div.addEventListener("change", convertCurrency); // si l'utilisateur change la valeur de l'input ou click ailleurs sur la page
    entry_div.addEventListener("input", function(){
        this.style.color = "black"; // on s'assure que la couleur du texte est noir après modification
    }); 
    result_div.addEventListener("change", convertCurrency); // si le résultat est modifié manuellement on re-calcule
});