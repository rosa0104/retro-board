package de.belmegamaja.retroboard.retros

import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RestController

@RestController
class RetroController(
        private val retroService: RetroService
) {

    @GetMapping("api/retros")
    fun getRetros(
    ): List<RetroResponse> {
        return retroService.getRetros()
    }

    @PostMapping("api/retros/")
    fun createRetro(
            @RequestBody createRetroRequest: CreateRetroRequest
    ): RetroResponse {
        return retroService.createRetro(createRetroRequest)
    }

}

