package com.example.conectabook.components

import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.MaterialTheme
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.unit.dp
import androidx.compose.material3.Icon
import androidx.compose.material3.Text
import androidx.compose.ui.text.font.FontWeight

@Composable
fun ResumoEstanteCard(
    icon: ImageVector,
    titulo: String,
    quantidade: Int,
    modifier: Modifier = Modifier
) {

    val colors = MaterialTheme.colorScheme

    Card(
        modifier = Modifier,
        shape = RoundedCornerShape(16.dp),
        colors = CardDefaults.cardColors(
            containerColor = colors.surface
        )
    ) {
        Row(
            modifier = Modifier.padding(16.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            Icon(
                imageVector = icon,
                contentDescription = titulo,
                tint = colors.primary
            )

            Spacer(modifier = Modifier.width(12.dp))

            Column {
                Text(
                    text = titulo,
                    fontWeight = FontWeight.SemiBold
                )

                Text(
                    text = "$quantidade livros",
                    color = colors.onSurfaceVariant
                )
            }
        }
    }
}