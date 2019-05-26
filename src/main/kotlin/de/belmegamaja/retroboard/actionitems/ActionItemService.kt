package de.belmegamaja.retroboard.actionitems

import org.springframework.data.mongodb.repository.MongoRepository
import org.springframework.stereotype.Repository
import org.springframework.stereotype.Service
import java.util.*

@Service
class ActionItemService(
        val mongoActionItemRepository: MongoActionItemRepository
) {

    fun getActionItemsByRetroId(retroId: String): List<ActionItemResponse> {
        return mongoActionItemRepository.findByRetroId(retroId).map { mapToResponse(it) }
    }

    private fun mapToResponse(it: ActionItem): ActionItemResponse {
        return ActionItemResponse(
                id = it.id,
                title = it.title,
                retroId = it.retroId,
                assignee = it.assignee
        )
    }

    fun createActionItem(createActionItemRequest: CreateActionItemRequest, retroId: String): ActionItemResponse {
        val actionItem = ActionItem(
                id = UUID.randomUUID().toString(),
                title = createActionItemRequest.title,
                retroId = retroId,
                assignee = createActionItemRequest.assignee
        )
        mongoActionItemRepository.save(actionItem)
        return mapToResponse(actionItem)
    }
}

@Repository
interface MongoActionItemRepository: MongoRepository<ActionItem, String> {
    fun findByRetroId(retroId: String): List<ActionItem>
}