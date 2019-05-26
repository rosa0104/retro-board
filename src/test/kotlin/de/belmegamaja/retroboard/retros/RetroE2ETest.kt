package de.belmegamaja.retroboard.retros

import org.assertj.core.api.Assertions.assertThat
import org.junit.After
import org.junit.Before
import org.junit.Test
import org.junit.runner.RunWith
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.boot.test.web.client.TestRestTemplate
import org.springframework.http.HttpStatus
import org.springframework.test.context.ActiveProfiles
import org.springframework.test.context.junit4.SpringRunner
import java.time.LocalDate

@ActiveProfiles("test")
@RunWith(SpringRunner::class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class RetroE2ETest {

    @Autowired
    lateinit var client: TestRestTemplate

    @Autowired
    lateinit var mongoRepository: MongoRetroRepository

    @Before
    @After
    fun `clean up database`(){
        mongoRepository.deleteAll()
    }

    @Test
    fun `store retro - saves in database`() {
        // given
        val createRetroItemRequest = CreateRetroRequest(
                team = "foo"
        )

        // when
        val response = client.postForEntity(
                "/api/retros/",
                createRetroItemRequest,
                RetroResponse::class.java)


        //then
        assertThat(response.statusCode).isEqualTo(HttpStatus.OK)
        assertThat(response.body?.team).isEqualTo("foo")
    }

    @Test
    fun `get retros - returns empty list`(){
        // given

        // when
        val response = client.getForEntity(
                "/api/retros",
                Array<RetroResponse>::class.java)

        // then
        assertThat(response.statusCode).isEqualTo(HttpStatus.OK)
        assertThat(response.body).isEmpty()
    }

    @Test
    fun `get retros - returns saved retro`(){
        // given
        val retro = Retro(
                id = "567",
                date = LocalDate.now(),
                team = "Die Schlümpfe"
        )
        mongoRepository.save(retro)

        // when
        val response = client.getForEntity(
                "/api/retros",
                Array<RetroResponse>::class.java)

        // then
        assertThat(response.statusCode).isEqualTo(HttpStatus.OK)
        assertThat(response.body?.first()?.team).isEqualTo("Die Schlümpfe")
    }

}