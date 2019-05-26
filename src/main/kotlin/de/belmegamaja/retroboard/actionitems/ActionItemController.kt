package de.belmegamaja.retroboard.actionitems

import org.springframework.web.bind.annotation.*

@RestController
class ActionItemController(
        private val actionItemService: ActionItemService
) {

    @GetMapping("api/retros/{id}/actionitems")
    fun getActionItemsByRetroId(
            @PathVariable id: String
    ): List<ActionItemResponse> {
        return actionItemService.getActionItemsByRetroId(id)
    }

    @PostMapping("api/retros/{id}/actionitems")
    fun createActionItemForRetro(
            @PathVariable id: String,
            @RequestBody createRetroItemRequest: CreateActionItemRequest): ActionItemResponse {
        return actionItemService.createActionItem(createRetroItemRequest, id)
    }
}
