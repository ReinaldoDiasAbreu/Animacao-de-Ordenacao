/* 
FUNÇÕES PRINCIPAIS DA PÁGINA
Linguagem: JavaScript
Desenvolverdor: Reinaldo Junio Dias de Abreu
				Cauã Ribeiro da Costa Aguiar
Versão: 10.0
Data: 16 de Dezembro de 2018
Montes Claros MG
IFNMG - Intituto Federal do Norte de Minas Gerais
*/

/* VARIAVEIS GLOBAIS */

var trocas = 0;		// Variavel Global para Contagem de Trocas

/* CAPTURA O VETOR DO FORMULARIO */
function pegarvetor(){	// Captura o vetor contido no input text
	var linha = document.getElementById("campo").value;
	var vetor = linha.split(",");	// Separa os valores pela virgula

	for(var i=0; i< vetor.length; i++)	// Converte cada valor em inteiro
	{
		vetor[i] = parseInt(vetor[i]);
		if(isNaN(vetor[i]))
		{
			vetor[i] = 0; // Caso o valor seja nulo ou branco, recebe o valor zero
		}
	}

	console.log("Vetor Capturado: " + vetor); // Log imprime o vetor
	console.log("Tamanho do Vetor: " + vetor.length); // Log imprime o tamanho do vetor

	return vetor; // retorna o vetor capturado
}

/* IMPRIME O TAMANHO DO VETOR NA TELA */
function imprime_tamanho(tam)
{
	if(tam != null)
	{
		var Tamanho = document.getElementById("TamanhoVetor");
		$(Tamanho).text("Tamanho: " + tam.toString());
	}
}

/* IMPRIME ELEMENTOS NA TELA NO SELECTION SORTE*/
function criar_grafico(vetor)		// Gera os elementos de cada valor no documento
{
	$('#grafico').html(""); // lIPA DIV grafico
	// Cria os elementos na tela
	for (var i = 0; i < vetor.length; i++) {
		
		var num = document.createElement("p");                      // Cria o elemento
		var text = document.createTextNode(vetor[i].toString());    // Seta o texto do elemento
		
		num.setAttribute("id", "num" + i.toString());			    // Altera o id
		
		num.text = vetor[i].toString();
		num.appendChild(text);                                      // Junta o texto ao p
		document.getElementById("grafico").appendChild(num);        // Adiciona o p na div
	}
}

/* ATUALIZA OS ELEMENTOS */
function reiniciar()
{
	//window.location.reload();		// Reinicia a página
	$('#grafico').html(""); 		// Limpa a div grafico para impressão
	$('#trocas').html(""); 			// Limpa a div trocas para impressão
	$('#pivoAtual').html(""); 		// Limpa a div pivoAtual para impressão
	$('#TamanhoVetor').html("");	// Limpa a div TamVetor para impressão
	trocas = 0;						// Zera a contagem de trocas
	$("#botaoq").prop("disabled", false); // Habilita o botao Quick Sort
	$("#botaos").prop("disabled", false); // Habilita o botao Selection Sort
	console.clear();				// Limpa o console de logs
}

/* CAPTURA A VELOCIDADE EM MILISEGUNDOS*/
function velocidade()
{
	// Calcula velocidade da ordenação
	var velocidade = parseInt(document.getElementById("velocidade").value);
	if(isNaN(velocidade) || velocidade < 1){	// Verifica se o valor não é nulo ou negativo
		velocidade = 1;
	}
	return velocidade;
}

/* IMPRIME A QUANTIDADE DE TROCAS FEITAS */
function imprime_trocas(trocas)
{
	if(trocas != null)
	{
		var quant = document.getElementById("trocas");
		$(quant).text("Trocas: " + trocas.toString());	
	}
}

/* FUNÇÃO DE ANIMAÇÃO E TROCA DE ELEMENTOS DO SELECTION SORT*/
function troca_sleep(vetor,num1, num2)		// Troca valor da posição num1 com a posição num2
{												
	// Seta o intervalo de execução da animação de acordo com a velocidade
	intervalo = 1000 * num1/velocidade();

	(function loop(intervalo) {  				
			setTimeout(function() 				// Essa função simula o delay de troca dos elementos
				{   							// a partir de um valor variável como o intervalo
					
					console.log("Pos Menor : " + num2 + " - Valor Menor: " + vetor[num2]);

					var pos1 = document.getElementById("num"+num1.toString());	// Elemento posição num1
					var pos2 = document.getElementById("num"+num2.toString());	// Elemento posição num2

					var var1 = document.getElementById("num"+num1.toString()).innerHTML; // Valor contido na posição num1
					var var2 = document.getElementById("num"+num2.toString()).innerHTML; // Valor contido na posição num2

					$(pos1).animate({backgroundColor: '#00FF00'});	// Anima cor para verde
					$(pos2).animate({backgroundColor: '#00BFFF'});  // Anima cor para azul

					$(pos1).text(var2.toString()); // Elemento 1 recebe valor do Elemento 2
					$(pos2).text(var1.toString()); // Elemento 2 recebe valor do Elemento 1

					$(pos1).animate({backgroundColor: '#ffffff'}); // Anima cor para branco
					$(pos2).animate({backgroundColor: '#ffffff'}); // Anima cor para branco

					console.log("Troca Pos: " + num1 + " com " + num2 + "."); // Log de cada troca dos valores

					trocas++;
					imprime_trocas(trocas);

				 }, intervalo)		// Delay vezes um valor variável
	    })
	    (intervalo);
}
/* ########################################################################################## */
/* ALGORITMO SELECTION SORT */
function retorna_pos_menor(vetor, a)	// retorna o posição do menor valor de um vetor
{
	var p = a;
	for (var b = a+1; b < vetor.length; b++) {

		if(vetor[b] < vetor[p])
		{
			p = b;
		}
	}
	return p;
}

function selection_sort()				// Algoritmo Selection Sort
{
	var vetor = pegarvetor();
	imprime_tamanho(vetor.length);
	criar_grafico(vetor);

	console.log("Iniciando Selection Sort ...");
	$("#botaos").prop("disabled", true); // Desabilita o botao do Selection
	$("#botaoq").prop("disabled", true); // Desabilita o botao do Quick

	for (var i = 0; i < vetor.length-1; i++) {
		var menor = retorna_pos_menor(vetor,i);
		
		var aux = vetor[i];
		vetor[i] = vetor[menor];
		vetor[menor] = aux;
		troca_sleep(vetor, i, menor);
	}	
}

/* ########################################################################################## */
/* ALGORITMO QUICK SORT */

function iniciar_quick(){ // No html essa função é chamada para pegar o vetor, e chamar a função quick

	console.log("Iniciando Quick Sort ...");
	var vetor = pegarvetor();			 // Captura o vetor
	imprime_tamanho(vetor.length);

	$("#botaos").prop("disabled", true); // Desabilita o botao do Selection
	$("#botaoq").prop("disabled", true); // Desabilita o botao do Quick

	imprimir_quick(vetor, null);		// Imprime o vetor inicial
	quick(vetor, 0, ((vetor.length)-1));// Inicia o Quick Sort
}

/* ALGORIMTMO DE ORDENACAO QUICK SORT */
function quick(vetor, primeiro, ultimo) // A função define o primeiro e ultimo que sao os numeros auxiliares do quicksort
{
	// Variáveis de indices
	i = primeiro;
	j = ultimo;
	
	pivo = vetor[parseInt((i+j)/2)];	// O pivo é definido como o elemento do meio do vetor

	console.log("Pivo: " + pivo);
	console.log( vetor );	 

	quicksort(vetor, i, j, pivo, primeiro, ultimo);
}
 
function quicksort(vetor, i, j, pivo, primeiro, ultimo) // Parte principal do quicksort, a que faz a troca.
{
	// Calcula velocidade da ordenação
	var time = 500 * 1/velocidade();
	
	while( vetor[i] < pivo ) //Aqui é a parte esquerda do vetor, o while procura o valor
	{						// que está a esquerda do vetor, que seja maior que o pivo 
		i++;				//para trocar com o valor do while de baixo
	}
	while( vetor[j] > pivo )	//Esse while procura algum valor que seja menor que o pivo para trocar com o while de cima
	{
		j--;
	}
	if( i <= j )
	{
		aux = vetor[j];
		vetor[j] = vetor[i];  //Aqui acontece a troca
		vetor[i] = aux;
		i++;
		j--;
		imprimir_quick( vetor , pivo ); // Reimprime os blocos com as alterações
		trocas++;
		imprime_trocas(trocas); //Mostra a quantidade de trocas
	}
	
	if( i < j ){ //Quando i é maior q j, significa que o vetor tá quase ordenado
		setTimeout(function(){
			quicksort(vetor, i, j, pivo, primeiro, ultimo);
		}, time);
	}
	else{
			
			if( primeiro < j ) //Aqui o quicksort vai ser executado do inicio até a metade.
			{
				setTimeout(function(){
					quick(vetor, primeiro, j);
				}, time);
			}
			if( ultimo > i ) //Aqui o quicksort vai ser executado da metade até o fim.
			{
				setTimeout(function(){
					quick(vetor, i,  ultimo);
				}, time);
			}
		}
}

/* IMPRIME OS BLOCOS DO VETOR NA TELA */
function imprimir_quick(vetor, pivo)
{	
	$('#grafico').html(""); // Limpa a div grafico para impressão

	if(pivo != null)
	{
		imprime_pivo(pivo);
	}
	
	for(var i= 0; i < vetor.length; i++)
	{
		$("#grafico").append("<div class='bloco'>" + vetor[i] + "</div>");
	}
}

/* IMPRIME O VETOR NA TELA */
function imprime_pivo(pivo)
{
	// Atualiza o pivo atual na tela
	if(pivo != null)
	{
		var PivoAtual = document.getElementById("pivoAtual");
		$(PivoAtual).text("Pivô: " + pivo.toString());
	}
}

/* ########################################################################################## */