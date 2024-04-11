var svgPattern = /<svg[\s\S]*?<\/svg>/gm
var expression = document.getElementById('expression')
var operation_limit = 0
var operation = ''
var num_1 = '0'
var num_2 = ''
var div_svg = `<svg id="temp-svg" width="30" height="31" viewBox="0 0 17 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16.0338 7.672V10.072H0.48175V7.672H16.0338ZM8.25775 13.08C8.87642 13.08 9.37775 13.272 9.76175 13.656C10.1458 14.04 10.3378 14.5413 10.3378 15.16C10.3378 15.7787 10.1458 16.28 9.76175 16.664C9.37775 17.048 8.87642 17.24 8.25775 17.24C7.63908 17.24 7.13775 17.048 6.75375 16.664C6.36975 16.28 6.17775 15.7787 6.17775 15.16C6.17775 14.5413 6.36975 14.04 6.75375 13.656C7.13775 13.272 7.63908 13.08 8.25775 13.08ZM8.25775 0.567999C8.87642 0.567999 9.37775 0.759999 9.76175 1.144C10.1458 1.528 10.3378 2.02933 10.3378 2.648C10.3378 3.26667 10.1458 3.768 9.76175 4.152C9.37775 4.536 8.87642 4.728 8.25775 4.728C7.63908 4.728 7.13775 4.536 6.75375 4.152C6.36975 3.768 6.17775 3.26667 6.17775 2.648C6.17775 2.02933 6.36975 1.528 6.75375 1.144C7.13775 0.759999 7.63908 0.567999 8.25775 0.567999Z" fill="#17171C"/></svg>`


function calculate(num1, num2, op) {
    try {
        switch(op) {
            case '/':
                return +(num1 / num2).toFixed(3)
            case '+':
                return +(num1 + num2).toFixed(3)
            case '-':
                return +(num1 - num2).toFixed(3)
            case '*':
                return +(num1 * num2).toFixed(3)
        }
    }
    catch{
        expression.innerHTML = "ОШИБКА"
        num_1 = '0'
        num_2 = ''
        operation = ''
    }
}



document.querySelectorAll('.btn').forEach(function(element) {
    element.onclick = function() {
        switch (element.id){

            // спец.символы
            case 'delete':
                if (expression.innerHTML.length == 1){
                    expression.innerHTML = "0"
                    break
                }
                else if (num_2 != ''){
                    expression.innerHTML = expression.innerHTML.slice(0, -1,).trim()
                    num_2 = num_2.slice(0, -1)
                }
                else if (operation != ''){
                    if (operation == '/'){
                        expression.innerHTML = expression.innerHTML.replace(svgPattern, '')
                        operation = ''
                        console.log(operation)
                    }
                    else{
                        expression.innerHTML = expression.innerHTML.slice(0, -1,).trim()
                        operation = ''
                    }
                }
                else{
                    expression.innerHTML = expression.innerHTML.slice(0, -1,).trim();
                    num_1 = num_1.slice(0,-1)
                }
                console.log(operation)
                console.log(num_1)
                console.log(num_2)
                break

            case '=':
                if (num_2 != ''){
                expression.innerHTML = String(calculate(Number(num_1), Number(num_2), operation))
                num_1 = String(calculate(Number(num_1), Number(num_2), operation))
                num_2 = ''
                operation = ''
                }
                break

            case 'C':
                expression.innerHTML = "0"
                num_2 = ''
                num_1 = '0'
                operation = ''
                break

            case 'reverse_sign':
                if (num_2 != ''){
                    expression.innerHTML = String(-(calculate(Number(num_1), Number(num_2), operation)))
                    num_1 = String(-(calculate(Number(num_1), Number(num_2), operation)))
                    operation = ''
                }
                else{
                    expression.innerHTML = String(-Number(num_1))
                    num_1 = String(-Number(num_1))
                }
                break

            case '%':
                expression.innerHTML = String(Number(num_1) / 100)
                operation = ''
                num_1 = '0'
                break


            default:
                // В случае когда начальная строка это просто 0

                if (expression.innerHTML == "0"){
                    if (element.classList[1] == 'operation') { //если ввели операцию
                        if (operation == ''){
                            if (element.id == '/'){
                                expression.innerHTML += `<svg id="temp-svg" width="30" height="31" viewBox="0 0 17 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16.0338 7.672V10.072H0.48175V7.672H16.0338ZM8.25775 13.08C8.87642 13.08 9.37775 13.272 9.76175 13.656C10.1458 14.04 10.3378 14.5413 10.3378 15.16C10.3378 15.7787 10.1458 16.28 9.76175 16.664C9.37775 17.048 8.87642 17.24 8.25775 17.24C7.63908 17.24 7.13775 17.048 6.75375 16.664C6.36975 16.28 6.17775 15.7787 6.17775 15.16C6.17775 14.5413 6.36975 14.04 6.75375 13.656C7.13775 13.272 7.63908 13.08 8.25775 13.08ZM8.25775 0.567999C8.87642 0.567999 9.37775 0.759999 9.76175 1.144C10.1458 1.528 10.3378 2.02933 10.3378 2.648C10.3378 3.26667 10.1458 3.768 9.76175 4.152C9.37775 4.536 8.87642 4.728 8.25775 4.728C7.63908 4.728 7.13775 4.536 6.75375 4.152C6.36975 3.768 6.17775 3.26667 6.17775 2.648C6.17775 2.02933 6.36975 1.528 6.75375 1.144C7.13775 0.759999 7.63908 0.567999 8.25775 0.567999Z" fill="#17171C"/></svg>`
                                operation = element.id
                            }
                            else{
                                expression.innerHTML += element.innerHTML
                                operation = element.id
                            }
                        }
                    }
                    else{
                        expression.innerHTML = element.innerHTML
                        num_1 = element.id
                    }
                }
                
                else if (expression.innerHTML == "Infinity"){
                    expression.innerHTML = "0"
                    num_1 = '0'
                }
                // в случае ввода операции
                else if (element.classList[1] == 'operation') { //если ввели операцию
                        if (operation == ''){
                            if (element.id == '/'){
                                expression.innerHTML += `<svg id="temp-svg" width="30" height="31" viewBox="0 0 17 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16.0338 7.672V10.072H0.48175V7.672H16.0338ZM8.25775 13.08C8.87642 13.08 9.37775 13.272 9.76175 13.656C10.1458 14.04 10.3378 14.5413 10.3378 15.16C10.3378 15.7787 10.1458 16.28 9.76175 16.664C9.37775 17.048 8.87642 17.24 8.25775 17.24C7.63908 17.24 7.13775 17.048 6.75375 16.664C6.36975 16.28 6.17775 15.7787 6.17775 15.16C6.17775 14.5413 6.36975 14.04 6.75375 13.656C7.13775 13.272 7.63908 13.08 8.25775 13.08ZM8.25775 0.567999C8.87642 0.567999 9.37775 0.759999 9.76175 1.144C10.1458 1.528 10.3378 2.02933 10.3378 2.648C10.3378 3.26667 10.1458 3.768 9.76175 4.152C9.37775 4.536 8.87642 4.728 8.25775 4.728C7.63908 4.728 7.13775 4.536 6.75375 4.152C6.36975 3.768 6.17775 3.26667 6.17775 2.648C6.17775 2.02933 6.36975 1.528 6.75375 1.144C7.13775 0.759999 7.63908 0.567999 8.25775 0.567999Z" fill="#17171C"/></svg>`
                                operation = element.id
                            }
                            else{
                                expression.innerHTML += element.innerHTML
                                operation = element.id
                            }
                        }
                }

                else {
                    expression.innerHTML += element.id
                    if (operation == ''){
                        num_1 += element.id
                    }
                    else {
                        num_2 += element.id
                    }
                    console.log(operation)
                    console.log(num_1)
                    console.log(num_2)
                }
                break
        }
    }
});
