package de.belmegamaja.retroboard.retroitems

import org.assertj.core.api.Assertions.assertThat
import org.junit.After
import org.junit.Before
import org.junit.Test
import org.junit.runner.RunWith
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.boot.test.web.client.TestRestTemplate
import org.springframework.http.HttpEntity
import org.springframework.http.HttpMethod
import org.springframework.http.HttpStatus
import org.springframework.test.context.ActiveProfiles
import org.springframework.test.context.junit4.SpringRunner

@ActiveProfiles("test")
@RunWith(SpringRunner::class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class RetroItemE2ETest {

    @Autowired
    lateinit var client: TestRestTemplate

    @Autowired
    lateinit var mongoRepository: MongoRetroItemRepository

    @Before
    @After
    fun `clean up database`(){
        mongoRepository.deleteAll()
    }

    @Test
    fun `store retro item - saves in database`() {
        // given
        val createRetroItemRequest = CreateRetroItemRequest(
                title = "foo",
                type = "bar"
        )

        // when
        val response = client.postForEntity(
                "/api/retros/123/retroitems",
                createRetroItemRequest,
                Void::class.java)


        //then
        assertThat(response.statusCode).isEqualTo(HttpStatus.OK)
        assertThat(response.body).isNull()

        val retroItem = mongoRepository.findByTitle("foo")
        assertThat(retroItem).hasSize(1)
        assertThat(retroItem.first().type).isEqualTo("bar")
    }

    @Test
    fun `get retro item by retro id - returns empty list`(){
        // given

        // when
        val response = client.getForEntity(
                "/api/retros/123/retroitems?type=positive",
                Array<RetroItem>::class.java)

        // then
        assertThat(response.statusCode).isEqualTo(HttpStatus.OK)
        assertThat(response.body).isEmpty()
    }

    @Test
    fun `get retro item by retro id - returns saved item`(){
        // given
        val retroItem = RetroItem(
                id = "567",
                title = "New team member",
                type = "positive",
                retroId = "123",
                author = "Kate",
                done = false
        )
        mongoRepository.save(retroItem)

        // when
        val response = client.getForEntity(
                "/api/retros/123/retroitems?type=positive",
                Array<RetroItem>::class.java)

        // then
        assertThat(response.statusCode).isEqualTo(HttpStatus.OK)
        assertThat(response.body).containsExactlyInAnyOrder(retroItem)
    }

    @Test
    fun `update retro item - sets item to done`(){
        // given
        val retroItem = mongoRepository.save(RetroItem(
                id = "123",
                title = "New team member",
                type = "positive",
                retroId = "111",
                author = "Kate",
                done = false
        ))

        val updateRetroItemRequest = UpdateRetroItemRequest(
                done = true,
                id = "123"
        )

        // when
        val response = client.exchange(
                "/api/retroitems/123",
                HttpMethod.PUT,
                HttpEntity(updateRetroItemRequest),
                RetroItemResponse::class.java
        )

        // then
        assertThat(response.statusCode).isEqualTo(HttpStatus.OK)
        assertThat(response.body?.done).isEqualTo(true)
        assertThat(response.body?.id).isEqualTo(retroItem.id)
        assertThat(response.body?.title).isEqualTo(retroItem.title)
        assertThat(response.body?.author).isEqualTo(retroItem.author)
        assertThat(response.body?.type).isEqualTo(retroItem.type)
        assertThat(response.body?.retroId).isEqualTo(retroItem.retroId)
    }
}