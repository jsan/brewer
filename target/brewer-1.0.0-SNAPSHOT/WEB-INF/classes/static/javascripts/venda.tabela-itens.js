Brewer.TabelaItens = (function(){
	
	function TabelaItens (autocomplete){
		this.autocomplete = autocomplete;
		this.tabelaCervejaContainer = $('.js-tabela-cerveja-container');
		this.uuid = $("#uuid").val();
		this.emitter = $({}); // emissor de eventos
		this.on = this.emitter.on.bind(this.emitter);

	}
	
	TabelaItens.prototype.iniciar = function (){
		this.autocomplete.on('item-selecionado', onItemSelecionado.bind(this));
		
	}
	
	function onItemSelecionado(evento, item){
		var resposta = $.ajax({
			url: 'item',
			method: 'POST',
			data: {
				codigoCerveja: item.codigo,
				uuid: this.uuid
			}
		});
		
		resposta.done(onItenAtualizadoNoServidor.bind(this));
	}
	
	function onItenAtualizadoNoServidor(html){
		this.tabelaCervejaContainer.html(html)
		var quantidadeInput = $('.js-tabela-item-quantidade');
		quantidadeInput.on('change', onItemQuantidadeItemAlterado.bind(this));
		quantidadeInput.maskMoney({precision:0});
		
		$('.js-tabela-cerveja-excluir-item').on('click', onItemExcluirClick.bind(this));
		
		var tabelaItem = $(".js-tabela-item");
		this.emitter.trigger('tabela-itens-atualizada', tabelaItem.data('valor-total'));
		
	}
	
	function onItemQuantidadeItemAlterado(evento){
		var input = $(evento.target); // aqui se pega todas as propriedades da tag input que sofreu o onChange 
		var quantidade = input.val();

		if (quantidade <= 0){
			input.val(1);
			quantidade = 1;
		}
		
		var codigoCerveja = input.data('codigo-cerveja');
		var resposta = $.ajax({
			url: 'item',
			method: 'PUT',
			data: {
				codigoCerveja: codigoCerveja,
				quantidade: quantidade,
				uuid: this.uuid
			}
		});

		resposta.done(onItenAtualizadoNoServidor.bind(this));
	}
	
	function onItemExcluirClick(evento){
		var aHref = $(evento.target);  
		var codigoCerveja = aHref.data('codigo-excluir');
		var nomeCerveja = aHref.data('nome-excluir');
		if (confirm("Confirma apagar o item: "+nomeCerveja)){
			var resposta = $.ajax({
				url: 'item/' + this.uuid + '/' + codigoCerveja,
				method: 'DELETE'
			});
		}
		
		resposta.done(onItenAtualizadoNoServidor.bind(this));
	}
	
	return TabelaItens;

}());
