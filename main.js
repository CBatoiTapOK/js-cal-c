var svgPattern = /<svg[\s\S]*?<\/svg>/gm
var expression = document.getElementById('expression')


document.querySelectorAll('.btn').forEach(function(element) {
    element.onclick = function() {
        switch (element.id){
            case '/':
                expression.innerHTML += `<svg id="temp-svg" width="30" height="31" viewBox="0 0 17 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16.0338 7.672V10.072H0.48175V7.672H16.0338ZM8.25775 13.08C8.87642 13.08 9.37775 13.272 9.76175 13.656C10.1458 14.04 10.3378 14.5413 10.3378 15.16C10.3378 15.7787 10.1458 16.28 9.76175 16.664C9.37775 17.048 8.87642 17.24 8.25775 17.24C7.63908 17.24 7.13775 17.048 6.75375 16.664C6.36975 16.28 6.17775 15.7787 6.17775 15.16C6.17775 14.5413 6.36975 14.04 6.75375 13.656C7.13775 13.272 7.63908 13.08 8.25775 13.08ZM8.25775 0.567999C8.87642 0.567999 9.37775 0.759999 9.76175 1.144C10.1458 1.528 10.3378 2.02933 10.3378 2.648C10.3378 3.26667 10.1458 3.768 9.76175 4.152C9.37775 4.536 8.87642 4.728 8.25775 4.728C7.63908 4.728 7.13775 4.536 6.75375 4.152C6.36975 3.768 6.17775 3.26667 6.17775 2.648C6.17775 2.02933 6.36975 1.528 6.75375 1.144C7.13775 0.759999 7.63908 0.567999 8.25775 0.567999Z" fill="#17171C"/></svg>`
                break

            case 'delete':
                if (expression.innerHTML.length == 1){
                    expression.innerHTML = "0"
                }
                else {
                    if ((expression.innerHTML.match(/<svg[\s\S]*?<\/svg>./gm) == null) && (expression.innerHTML.match(svgPattern) != null)){
                        expression.innerHTML = expression.innerHTML.replace(svgPattern, '')
                    }
                    else{
                        expression.innerHTML = expression.innerHTML.slice(0, -1,).trim();
                    }
                }
                break

            case '=':
                expression.innerHTML = "0"
                break

            case 'C':
                expression.innerHTML = "0"
                break

            default:
                if (expression.innerHTML == "0"){
                    expression.innerHTML = element.innerHTML
                }
                else {
                    expression.innerHTML += element.innerHTML
                }
                break
    }}
})
