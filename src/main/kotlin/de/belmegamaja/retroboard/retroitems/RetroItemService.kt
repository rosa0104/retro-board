package de.belmegamaja.retroboard.retroitems

import org.springframework.data.mongodb.repository.MongoRepository
import org.springframework.stereotype.Repository
import org.springframework.stereotype.Service
import java.util.*

@Service
class RetroItemService(
        val mongoRetroItemRepository: MongoRetroItemRepository
) {

    fun updateRetroItem(updateRetroItemRequest: UpdateRetroItemRequest): RetroItemResponse {
        val retroItem = mongoRetroItemRepository.findById(updateRetroItemRequest.id).orElseThrow { RuntimeException("Not found") }
        val updatedRetroItem = retroItem.copy(
                done = updateRetroItemRequest.done
        )
        mongoRetroItemRepository.save(updatedRetroItem)

        return mapToResponse(updatedRetroItem)
    }

    fun getRetroItemsByRetroId(retroId: String, type: String): List<RetroItemResponse> {
        return mongoRetroItemRepository.findByRetroIdAndType(retroId, type).map { mapToResponse(it) }
    }

    private fun mapToResponse(it: RetroItem): RetroItemResponse {
        return RetroItemResponse(
                id = it.id,
                title = it.title,
                type = it.type,
                retroId = it.retroId,
                author = it.author,
                done = it.done
        )
    }

    fun createRetroItem(createRetroItemRequest: CreateRetroItemRequest, retroId: String, author: String): RetroItemResponse {
        val newRetroItem = RetroItem(
                id = UUID.randomUUID().toString(),
                title = createRetroItemRequest.title,
                type = createRetroItemRequest.type,
                retroId = retroId,
                author = author,
                done = false
        )
        mongoRetroItemRepository.save(newRetroItem)
        return mapToResponse(newRetroItem)
    }
}

@Repository
interface MongoRetroItemRepository: MongoRepository<RetroItem, String> {
    fun findByTitle(title: String): List<RetroItem>
    fun findByRetroIdAndType(retroId: String, type: String): List<RetroItem>
}