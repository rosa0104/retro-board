package de.belmegamaja.retroboard.config

import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier
import com.google.api.client.http.javanet.NetHttpTransport
import com.google.api.client.json.jackson2.JacksonFactory
import org.springframework.context.annotation.Profile
import org.springframework.core.annotation.Order
import org.springframework.stereotype.Component
import java.io.IOException
import javax.servlet.*
import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse

@Profile("!test")
@Component
@Order(1)
class TokenFilter : Filter {

    private val jacksonFactory = JacksonFactory()
    private val transport = NetHttpTransport.Builder().build()

    private val retroBoardGoogleClientId = listOf("676214566646-j27ke057nn494ktol02l4f8bnkqhqmm4.apps.googleusercontent.com")


    @Throws(IOException::class, ServletException::class)
    override fun doFilter(
            request: ServletRequest,
            response: ServletResponse,
            chain: FilterChain) {

        val req = request as HttpServletRequest

        if (!req.servletPath.contains("/api")) {
            chain.doFilter(request, response)
            return // ignore calls that are not for backend
        }

        val idToken = req.getHeader("Authorization")

        val verifier = GoogleIdTokenVerifier.Builder(transport, jacksonFactory)
                .setAudience(retroBoardGoogleClientId)
                .build()

        val userToken =
                if (idToken != null) verifier.verify(idToken)
                else null

        if (userToken != null) {
            request.setAttribute("userEmail", userToken.payload.email)
            chain.doFilter(request, response)
        } else
            (response as HttpServletResponse).sendError(
                    HttpServletResponse.SC_UNAUTHORIZED,
                    "No valid token.")

    }

}


/**
 * For UnitTests, pretend authentication
 */
@Profile("test")
@Component
@Order(1)
class TestTokenFilter : Filter {

    @Throws(IOException::class, ServletException::class)
    override fun doFilter(
            request: ServletRequest,
            response: ServletResponse,
            chain: FilterChain) {

        request.setAttribute("userEmail", "testUser")
        chain.doFilter(request, response)
    }

}