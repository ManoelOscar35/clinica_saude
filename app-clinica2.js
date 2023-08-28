class Consulta {
	constructor(nome_completo, telefone, email, procedimento) {
		this.nome_completo = nome_completo;
		this.telefone = telefone;
		this.email = email;
		this.procedimento = procedimento;
	}

	validarDados() {
		for(let i in this) {
			if(this[i] === undefined || this[i] === '' || this[i] === null) {
				return false;
			}
		}
		return true;
	}
}

class Bd {

	constructor() {
		let id = localStorage.getItem('id');
		
		if (id === null) {
			localStorage.setItem('id', 0);
		}
	}
	
	getProximoId() {
		let proximoId = localStorage.getItem('id');
		
		return (parseInt(proximoId) + 1);
	}

	gravar(c) {
		//localStorage.setItem('consulta', JSON.stringify(c));
		let id = this.getProximoId();

		localStorage.setItem(id, JSON.stringify(c));

		localStorage.setItem('id', id);
	}

	recuperarTodosRegistros() {

		let consultas = Array();

		let id = localStorage.getItem('id');

		//Recuperar todas as consultas cadastradas no localStorage
		for(let i = 1; i <= id; i++) {
			
			//Recuperar a consulta
			let consulta = JSON.parse(localStorage.getItem(i));

			//Instrução caso o documento(i(id) seja nulo
			if (consulta === null) {
				continue;
			}

			consulta.id = i;
			consultas.push(consulta);

		}

		return consultas;
		
	}

	remover(id) {
		localStorage.removeItem(id);

	}

	

}

let bd = new Bd();

function marcarProcedimento() {
	let nome_completo = document.getElementById('nome_completo');
	let telefone = document.getElementById('telefone');
	let email = document.getElementById('email');
	let procedimento = document.getElementById('procedimento');

	let consulta = new Consulta(

		nome_completo.value,
		telefone.value,
		email.value,
		procedimento.value
	
	);

	if(consulta.validarDados()) {
		bd.gravar(consulta);

		document.getElementById('modal_titulo').innerHTML = 'Registro inserido com sucesso';
		document.getElementById('modal_titulo_div').className = 'modal-header text-success';
		document.getElementById('modal_corpo').innerHTML = 'Procedimento foi realizado com sucesso.';
		document.getElementById('modal_btn').innerHTML = 'Voltar';
		document.getElementById('modal_btn').className = 'btn btn-success';
		$('#modalRegistro').modal('show');

	} else {
		document.getElementById('modal_titulo').innerHTML = 'Erro no registro';
		document.getElementById('modal_titulo_div').className = 'modal-header text-danger';
		document.getElementById('modal_corpo').innerHTML = 'Procedimento não foi realizado com sucesso.Tente novamente';
		document.getElementById('modal_btn').innerHTML = 'Voltar e corrigir';
		document.getElementById('modal_btn').className = 'btn btn-danger';
		$('#modalRegistro').modal('show');

	}
}

function carregaListaRegistros(consultas = Array(), filtro = false) {

	if(consultas.length == 0 && filtro == false) {
		consultas = bd.recuperarTodosRegistros(); 
	}

	//selecionando o elemento tbody da tabela
	let listaRegistro = document.getElementById('listaRegistro');
	listaRegistro.innerHTML = '';

	//percorrer o array consultas, listando cada despesa de forma dinânmica
	consultas.forEach(function(c) {

		let consulta = new Consulta();

		//criando a linha(tr)
		let linha = listaRegistro.insertRow();

		//criar as colunas(td)
		linha.insertCell(0).innerHTML = c.id;
		linha.insertCell(1).innerHTML = c.nome_completo;
		linha.insertCell(2).innerHTML = c.telefone;
		linha.insertCell(3).innerHTML = c.email;
		linha.insertCell(4).innerHTML = c.procedimento;



		//criar o botão de exclusão
		let btn = document.createElement("button");
		btn.className = 'btn btn-danger';
		btn.innerHTML = '<i class="fas fa-times"></i>';
		btn.id = `id_consulta_${c.id}`;
		btn.onclick = function() {

			if(consulta.validarDados()) { 
				

				document.getElementById('modal_titulo').innerHTML = 'Erro no procedimento';
				document.getElementById('modal_titulo_div').className = 'modal-header text-danger';
				document.getElementById('modal_corpo').innerHTML = 'Procedimento não foi realizado.';
				document.getElementById('modal_btn').innerHTML = 'Voltar e corrigir';
				document.getElementById('modal_btn').className = 'btn btn-danger';
				$('#modalRegistro').modal('show');
		
			} else {

				let id = this.id.replace('id_consulta_', '')
				bd.remover(id)
				
				document.getElementById('modal_titulo').innerHTML = 'Procedimento OK';
				document.getElementById('modal_titulo_div').className = 'modal-header text-success';
				document.getElementById('modal_corpo').innerHTML = 'Procedimento foi realizado com sucesso.';
				document.getElementById('modal_btn').innerHTML = 'Voltar';
				document.getElementById('modal_btn').className = 'btn btn-success';
				$('#modalRegistro').modal('show');

				setTimeout(() => window.location.href="registro.html", 2000 )    
				
			}
			
		}

		linha.insertCell(5).append(btn);
	})

	if(consultas.length == 0) {
		localStorage.clear();
		
	} 
}




