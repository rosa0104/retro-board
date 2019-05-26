package de.belmegamaja.retroboard.actionitems

import org.springframework.data.annotation.Id

data class ActionItem(
        @Id val id: String,
        val title: String,
        val retroId: String,
        val assignee: String? = null
)
data class ActionItemResponse(
        val id: String,
        val title: String,
        val retroId: String,
        val assignee: String?
)

data class CreateActionItemRequest(
        val title: String,
        val assignee: String? = null
)