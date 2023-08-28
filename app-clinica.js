class Cadastro {
	constructor(email) {
		this.email = email;
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

	gravar(cad) {
		//localStorage.setItem('cadastro', JSON.stringify(cad));
		let id = this.getProximoId();

		localStorage.setItem(id, JSON.stringify(cad));

		localStorage.setItem('id', id);
	}
}

let bd = new Bd();

function cadastrarEmail() {
	let email = document.getElementById('email');

	let cadastro = new Cadastro(

		email.value

	);

	if(cadastro.validarDados()) {
		bd.gravar(cadastro);

		document.getElementById('modal_titulo').innerHTML = 'Registro inserido com sucesso';
		document.getElementById('modal_titulo_div').className = 'modal-header text-success';
		document.getElementById('modal_corpo').innerHTML = 'Email cadastrado com sucesso.';
		document.getElementById('modal_btn').innerHTML = 'Voltar';
		document.getElementById('modal_btn').className = 'btn btn-success';
		$('#modalRegistraCadastro').modal('show');

	} else {
		document.getElementById('modal_titulo').innerHTML = 'Erro no registro';
		document.getElementById('modal_titulo_div').className = 'modal-header text-danger';
		document.getElementById('modal_corpo').innerHTML = 'Email não foi cadastrado.Tente novamente.';
		document.getElementById('modal_btn').innerHTML = 'Voltar e corrigir';
		document.getElementById('modal_btn').className = 'btn btn-danger';
		$('#modalRegistraCadastro').modal('show');

	}
}



