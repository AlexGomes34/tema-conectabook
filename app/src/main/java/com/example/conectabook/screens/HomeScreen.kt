package com.example.conectabook.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import com.example.conectabook.components.CriarPostcard
import com.example.conectabook.components.HomeaHeader
import com.example.conectabook.components.SecaoTitulosSugeridos

@Composable
fun HomeScreenn(modifier: Modifier = Modifier) {

    val colors = MaterialTheme.colorScheme

    Scaffold(
        bottomBar = {}
    ) { paddingValues ->

        LazyColumn(
            modifier = Modifier
                .fillMaxSize()
                .background(colors.background)
                .padding(paddingValues)
                .padding(horizontal = 24.dp),
            verticalArrangement = Arrangement.spacedBy(20.dp)
        ) {
            item {
                Spacer(modifier = Modifier.height(24.dp))
            }

            item {
                HomeaHeader()
            }

            item {
                CriarPostcard(

                )
            }

            item {
                SecaoTitulosSugeridos()
            }

            item {
                Text("Clubes")
            }

            item {
                Text("Feed")
            }
        }
    }

}