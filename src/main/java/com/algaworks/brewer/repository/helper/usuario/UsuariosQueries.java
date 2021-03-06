package com.algaworks.brewer.repository.helper.usuario;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.algaworks.brewer.model.Usuario;
import com.algaworks.brewer.repository.filters.UsuarioFilter;

public interface UsuariosQueries {
	
	public Optional<Usuario> getUsuarioPorEmailEAtivo(String email);
	
	public List<String> getPermissoes(Usuario usuario);

	public Page<Usuario> filtrar (UsuarioFilter usuarioFilter, Pageable pageable);
	
	public Usuario buscarComGrupos(Long codigo);


}
