package com.example.conectabook.components

import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.width
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp

@Composable
fun SecaoComunidadeLivro(modifier: Modifier = Modifier) {

    val colors = MaterialTheme.colorScheme

    Row(
        modifier = Modifier
    ) {
        Text(
            text = "O que a comunidade está dizendo",
            fontSize = 18.sp,
            fontWeight = FontWeight.Bold,
            color = colors.onBackground
        )

        Spacer(modifier = Modifier.width(10.dp))
    }

}