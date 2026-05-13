package com.example.conectabook.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.outlined.Book
import androidx.compose.material.icons.outlined.MenuBook
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Scaffold
import androidx.compose.runtime.Composable
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import com.example.conectabook.components.BottomBar
import com.example.conectabook.components.SearchBarLivros
import androidx.compose.runtime.getValue
import androidx.compose.runtime.setValue
import com.example.conectabook.components.ResumoEstanteCard

@Composable
fun LivrosScreen(modifier: Modifier = Modifier) {

    val colors = MaterialTheme.colorScheme
    var busca by remember { mutableStateOf("") }

    Scaffold(
        bottomBar = {
            BottomBar()
        }
    ) {
        paddingValues ->

        LazyColumn(
            modifier = Modifier
                .fillMaxSize()
                .background(colors.background)
                .padding(paddingValues)
                .padding(horizontal = 24.dp),
            verticalArrangement = Arrangement.spacedBy(20.dp)
        ) {

            item {
                SearchBarLivros(
                    busca = busca,
                    onBuscaChange = {busca = it},
                    onCameraClick = {
                    }
                )
            }

            item {
                ResumoEstanteCard(
                    icon = Icons.Outlined.Book,
                    titulo = "Lidos",
                    quantidade = 12
                )
            }
        }
    }
}