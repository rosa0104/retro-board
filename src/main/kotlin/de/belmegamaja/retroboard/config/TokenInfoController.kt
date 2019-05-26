package de.belmegamaja.retroboard.config

import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier
import com.google.api.client.http.javanet.NetHttpTransport
import com.google.api.client.json.jackson2.JacksonFactory
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestHeader
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import javax.ws.rs.core.Response

@RestController
@RequestMapping("/api/tokeninfo")
class TokenInfoController {

    private val jacksonFactory = JacksonFactory()
    private val transport = NetHttpTransport.Builder().build()

    private val retroBoardGoogleClientId = listOf("676214566646-j27ke057nn494ktol02l4f8bnkqhqmm4.apps.googleusercontent.com")

    @GetMapping
    fun getTokenInfo(@RequestHeader("Authorization") idToken: String): Response {

        val verifier = GoogleIdTokenVerifier.Builder(transport, jacksonFactory)
                .setAudience(retroBoardGoogleClientId)
                .build()

        val userToken = verifier.verify(idToken)

        return if (userToken != null)
            Response.ok(userToken).build()
        else
            Response.status(Response.Status.UNAUTHORIZED).build()
    }

}