package de.belmegamaja.retroboard.retros

import com.fasterxml.jackson.annotation.JsonFormat
import org.springframework.data.annotation.Id
import java.time.LocalDate

data class Retro (
        @Id
        val id: String,
        @JsonFormat(pattern = "yyyy-MM-dd")
        val date: LocalDate,
        val team: String
)

data class RetroResponse(
        val id: String,
        @JsonFormat(pattern = "yyyy-MM-dd")
        val date: LocalDate,
        val team: String
)

data class CreateRetroRequest(
        val team: String
)