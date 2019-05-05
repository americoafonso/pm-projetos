/*******************************************************************************
	Tarefa 1: (USE SWITCH CASE) 
		Crie uma função chamada calcularFrete que recebe a sigla do estado como 
		parâmetro e retorne o valor do frete. O frete deve ser calculado de acordo 
		com a seguinte tabela de preços:
			MG     -> 12,50
			SP     -> 23,90
			RJ     -> 18,20
			Outros -> 35,90
*******************************************************************************/

function calcularFrete(siglaEstado) {
	switch (siglaEstado) {
		case 'MG':
			return 12.50;			
			break;
		case 'SP':
			return 23.90;
			break;
		case 'RJ':
			return 18.20;
			break;	
		default:
			return 35.90;
	}
}


/*******************************************************************************
	Tarefa 2: (USE SWITCH CASE)
		Crie uma função chamada nomeMes, que recebe um número referente ao mês e 
		retorna o nome do mês equivalente. 1 para Janeiro, 2 para Fevereiro, 3 para 
		março e assim por diante, até 12 para dezembro. Deve retornar a mensagem
		"Mês inválido" caso seja usado algum número que não esteja entre 1 e 12.
*******************************************************************************/

function nomeMes(numeroDoMes) {
	switch (numeroDoMes) {
		case 1:
			return 'Janeiro';
			break;
		case 2:
			return 'Fevereiro';
			break;
		case 3:
			return 'março';
			break;
		case 4:
			return 'Abril';
			break;
		case 5:
			return 'Maio';
			break;
		case 6:
			return 'Junho';
			break;
		case 7:
			return 'Julho';
			break;
		case 8:
			return 'agosto';
			break;
		case 9:
			return 'Setembro';
			break;
		case 10:
			return 'Outubro';
			break;
		case 11:
			return 'Novembro';
			break;
		case 12:
			return 'dezembro';
			break;
		default:
			return 'Mês inválido';
	}
}


/*******************************************************************************
	Tarefa 3: (USE SWITCH CASE) 
		Crie uma função chamada tabelaPeriodica que recebe como parâmetro a sigla
		de um elemento químico e retorne o nome desse elemento. Para exemplificar, 
		passando a sigla Zn, vai retornar zinco e Pt vai retornar platina.
		Use essa referência para abranger todos os elementos:
		https://pt.wikipedia.org/wiki/Tabela_peri%C3%B3dica#Estrutura_da_tabela_peri%C3%B3dica		
*******************************************************************************/

function tabelaPeriodica(siglaElementoQuimico) {
	switch (siglaElementoQuimico) {
		case 'Zn':
			return 'zinco';
			break;
		case 'Pt':
			return 'platina';
			break;
		case 'Li':
			return 'lítio';
			break;
		case 'Sn':
			return 'estanho';
		default:
			return 'bromo';
	}
}