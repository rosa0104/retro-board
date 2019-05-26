package de.belmegamaja.retroboard.retroitems

import org.springframework.web.bind.annotation.*

@RestController
class RetroItemController(
        private val retroItemRepository: RetroItemService
) {

    @GetMapping("api/retros/{id}/retroitems")
    fun getRetroItemsByRetroId(
            @PathVariable id: String,
            @RequestParam type: String
    ): List<RetroItemResponse> {
        return retroItemRepository.getRetroItemsByRetroId(id, type)
    }

    @PostMapping("api/retros/{id}/retroitems")
    fun createRetroItemForRetro(
            @PathVariable id: String,
            @RequestBody createRetroItemRequest: CreateRetroItemRequest,
            @RequestAttribute userEmail: String): RetroItemResponse {
        return retroItemRepository.createRetroItem(createRetroItemRequest, id, userEmail)
    }

    @PutMapping("api/retroitems/{id}")
    fun updateRetroIten(
            @PathVariable id: String,
            @RequestBody updateRetroItemRequest: UpdateRetroItemRequest
    ): RetroItemResponse {
        return retroItemRepository.updateRetroItem(updateRetroItemRequest)
    }
}

