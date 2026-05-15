package com.example.conectabook.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.MaterialTheme
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import com.example.conectabook.components.AppHeader
import com.example.conectabook.components.SecaoHeroLivro

@Composable
fun DetalhesLivroScreen(modifier: Modifier = Modifier) {

    val colors = MaterialTheme.colorScheme

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(colors.background)
    ) {

        AppHeader(
            titulo = "detalhes do livro",
            mostrarVoltar = true,
            mostrarAvatar = true
        )
         Column(
             modifier = Modifier.padding(24.dp)
         ) {
             SecaoHeroLivro()
         }



    }
}