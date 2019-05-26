package de.belmegamaja.retroboard.retros

import org.springframework.data.mongodb.repository.MongoRepository
import org.springframework.stereotype.Repository
import org.springframework.stereotype.Service
import java.time.LocalDate
import java.util.*

@Service
class RetroService(
        val mongoRetroRepository: MongoRetroRepository
)  {

    fun getRetros(): List<RetroResponse> {
        return mongoRetroRepository.findAll().map { mapToResponse(it) }.sortedByDescending { it.date }
    }

    private fun mapToResponse(it: Retro): RetroResponse {
        return RetroResponse(
                id = it.id,
                date = it.date,
                team = it.team
        )
    }

    fun createRetro(createRetroItemRequest: CreateRetroRequest): RetroResponse {
        val newRetro = mongoRetroRepository.save(Retro(
                id = UUID.randomUUID().toString(),
                date = LocalDate.now(),
                team = createRetroItemRequest.team
        ))
        return mapToResponse(newRetro)
    }
}

@Repository
interface MongoRetroRepository: MongoRepository<Retro, String>