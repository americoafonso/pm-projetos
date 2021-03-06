/*******************************************************************************
	
	Tarefa 1:

		Defina uma classe com o nome Motor. Essa classe quando instanciada, receberá
		os parâmetros cilindradas e combustivel através do método construtor.
		Essa classe terá 2 métodos, um chamado ligar e outro chamado desligar, que 
		retorna strings conforme mostrado nos exemplos abaixo:

		new Motor(2000, 'gasolina').ligar() 
		~> "Motor 2000 cilindradas a gasolina está ligado"
		
		new Motor(1000, 'álcool').desligar() 
		~> "Motor 1000 cilindradas a álcool está desligado"

*******************************************************************************/

class Motor {
	constructor(cilindradas, combustivel) {
		this.cilindradas = cilindradas;
		this.combustivel = combustivel;
	}

	ligar() {
		return "Motor 2000 cilindradas a gasolina está ligado";
	}

	desligar() {
		return "Motor 1000 cilindradas a àlcool está desligado";
	}
}

motor = new Motor(2000, 'gasolina').ligar();

motor = new Motor(1000, 'álcool').desligar();






/*******************************************************************************
 
	Tarefa 2:

		Defina uma classe chamada Calculadora, que recebe 2 números como parâmetro
		no método construtor. Essa classe faz cálculos com esses 2 números através
		de 4 métodos: somar, subtrair, multiplicar, dividir. Exemplo de uso:

		new Calculadora(10, 2).somar()
		~> 12

		new Calculadora(10, 2).subtrair()
		~> 8

		new Calculadora(10, 2).multiplicar()
		~> 20

		new Calculadora(10, 2).dividir()
		~> 5
		
*******************************************************************************/

class Calculadora {
	constructor(num1, num2) {
		this.num1 = num1;
		this.num2 = num2;
	}

	somar() {
		return this.num1 + this.num2;
	}

	subtrair() {
		return this.num1 - this.num2;
	}

	multiplicar() {
		return this.num1 * this.num2;
	}

	dividir() {
		return this.num1 / this.num2;
	}
}

calculadora = new Calculadora(10, 2).somar();

calculadora = new Calculadora(10, 2).subtrair();

calculadora = new Calculadora(10, 2).multiplicar();

calculadora = new Calculadora(10, 2).dividir();


/*******************************************************************************
	
	Tarefa 3:

		Defina a classe Calendario. Ela deve ter 2 métodos estáticos. O primeiro
		método chamado nomeDias deve retornar um array com os dias da semana,
		começando com domingo.

		Calendario.nomeDias()
		~> ["domingo", "segunda-feira", "terça-feira", "quarta-feira", "quinta-feira", "sexta-feira", "sábado"]

		O segundo método estático chamado diaSemana deve receber como parâmetro uma 
		string contendo uma data no formato brasileiro (ex: 31/12/2019) e deve 
		retornar o nome do dia da semana que essa data se refere:

		Calendario.diaSemana('31/12/2019')
		~> "terça-feira"

		O método diaSemana deve obrigatoriamente fazer chamada ao método nomeDias
		que contém uma lista com os nomes dos dias da semana. Para criar esse método
		será necessário também entender como se usa a classe Date disponível nativa-
		mente no Javascript, conforme referência abaixo:

		https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Date

*******************************************************************************/

/*Inicio e declaracao da class Calendario */
class Calendario {

	static nomeDias() {
	  let semana = ["domingo", "segunda-feira", "terça-feira", "quarta-feira", "quinta-feira", "sexta-feira", "sábado"];
	  return semana;
	}
  
	static diaSemana(str) {
	  let partes = str.split('/').map(Number);
	  let today = new Date('20' + partes[2], partes[1] - 1, partes[0]);
	  let week = this.semana[this.today.getDay() % 7];
	  return [week.slice(0, 13) + ''].join(' ');
	}
  }
  console.log('Hoje e:');
  console.log(Calendario.diaSemana('31/12/2019'));
  
/*******************************************************************************
	
	Tarefa 4:

		Defina a classe CalendarioIngles. Essa classe deve herdar os métodos da
		classe Calendario, criado na tarefa anterior. Agora subscreva apenas o método 
		nomeDias, para que ele retorne uma lista de dias da semana em inglês

		CalendarioIngles.nomeDias()
		~> ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"]

		Fazendo isso, o o outro método diaSemana, passa a trazer os resultados em 
		inglês mesmo sem você ter alterado ele diretamente. Essa é a grande vantagem 
		de se usar orientação a objetos para reutilização de código:

		Calendario.diaSemana('31/12/2019')
		~> "tuesday"

*******************************************************************************/








/*******************************************************************************
 
	Tarefa 5:

		Defina a classe Agenda. Ela deve ter uma propriedade chamada contatos 
		inicializada com um array vazio. Deve ter um método chamado adicionaContato 
		que recebe os parâmetros nome, telefone e cria um objeto a ser adicionado na
		propriedade contatos. Essa classe deve ter também o método listaContatos que 
		retorna a lista de contatos armazenada na propriedade contatos.
		
*******************************************************************************/


