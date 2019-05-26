package de.belmegamaja.retroboard.actionitems

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

@ActiveProfiles("test")
@RunWith(SpringRunner::class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class ActionItemE2ETest {

    @Autowired
    lateinit var client: TestRestTemplate

    @Autowired
    lateinit var mongoRepository: MongoActionItemRepository

    @Before
    @After
    fun `clean up database`(){
        mongoRepository.deleteAll()
    }

    @Test
    fun `store action item - saves in database`() {
        // given
        val createActionItemRequest = CreateActionItemRequest(
                title = "foo"
        )

        // when
        val response = client.postForEntity(
                "/api/retros/123/actionitems",
                createActionItemRequest,
                ActionItemResponse::class.java)

        //then
        assertThat(response.statusCode).isEqualTo(HttpStatus.OK)
        assertThat(response.body?.title).isEqualTo("foo")
        assertThat(response.body?.assignee).isNull()

        val retroItem = mongoRepository.findByRetroId("123")
        assertThat(retroItem).hasSize(1)
        assertThat(retroItem.first().title).isEqualTo("foo")
    }

    @Test
    fun `get action items by retro id - returns empty list`(){
        // given

        // when
        val response = client.getForEntity(
                "/api/retros/123/actionitems",
                Array<ActionItemResponse>::class.java)

        // then
        assertThat(response.statusCode).isEqualTo(HttpStatus.OK)
        assertThat(response.body).isEmpty()
    }

    @Test
    fun `get action items by retro id - returns saved item`(){
        // given
        val actionItem = ActionItem(
                id = "567",
                title = "New team member",
                retroId = "123",
                assignee = "Kate"
        )
        mongoRepository.save(actionItem)

        // when
        val response = client.getForEntity(
                "/api/retros/123/actionitems",
                Array<ActionItem>::class.java)

        // then
        assertThat(response.statusCode).isEqualTo(HttpStatus.OK)
        assertThat(response.body).containsExactlyInAnyOrder(actionItem)
    }

}