package com.example.conectabook.components

import androidx.compose.foundation.Image
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.unit.dp

@Composable
fun PostCard(
    nome: String,
    tempo: String,
    texto: String,
    curtidas: Int,
    comentarios: Int,
    avatar: Int ,
    capaLivro: Int,
    nomeLivro: String,
    autorLivro: String,
    notaLivro: String,
    modifier: Modifier = Modifier) {

    val colors = MaterialTheme.colorScheme

    Card(
        modifier = Modifier.fillMaxWidth(),
        shape = RoundedCornerShape(16.dp),
        colors = CardDefaults.cardColors(
            containerColor = colors.surface
        ),
        elevation = CardDefaults.cardElevation(8.dp)
    ) {
        Column(
            modifier = Modifier.padding(16.dp)
        ) {
            Row() {
                Image(
                    painter = painterResource(id = avatar),
                    contentDescription = "Foto do usuário",
                    contentScale = ContentScale.Crop,
                    modifier = Modifier
                        .size(48.dp)
                        .clip(CircleShape)
                )

                Spacer(modifier = Modifier.width(12.dp))

                Column() {
                    Text(nome)
                    Text(tempo)
                }
            }

            Spacer(modifier = Modifier.width(12.dp))

            Text(text = texto)

            Spacer(modifier = Modifier.width(16.dp))

            Card() {
                Row(
                    modifier = Modifier.padding(12.dp)
                ) {
                    Image(
                        painter = painterResource(id = capaLivro),
                        contentDescription = "Foto da publicação do usuário",
                        contentScale = ContentScale.Crop,
                        modifier = Modifier.size(
                            width = 64.dp,
                            height = 90.dp
                        )
                    )

                    Spacer(modifier = Modifier.width(12.dp))

                    Column() {
                        Text(nomeLivro)
                        Text(autorLivro)
                        Text(notaLivro)
                    }
                }
            }

            Spacer(modifier = Modifier.width(16.dp))

            Row() {
                Text("<3 $curtidas")
                Spacer(modifier = Modifier.width(20.dp))
                Text(" $comentarios")
            }

        }
    }
}