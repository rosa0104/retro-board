package de.belmegamaja.retroboard.retroitems

import org.springframework.data.annotation.Id
import java.util.*

data class RetroItem(
        @Id val id: String,
        val title: String,
        val type: String,
        val retroId: String,
        val author: String = "unknown",
        val done: Boolean = false
)

data class RetroItemResponse(
        val title: String,
        val type: String,
        val retroId: String,
        val author: String,
        val done: Boolean = false,
        val id: String = UUID.randomUUID().toString()
)

data class UpdateRetroItemRequest(
        val done: Boolean,
        val id: String
)

data class CreateRetroItemRequest(
        val title: String,
        val type: String
)