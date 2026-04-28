# src/main/kotlin/HelloService.kt

```kotlin
package com.premierdarkcoffee.tourism

fun interface HelloService {
    fun sayHello()
}

```

---

# src/main/kotlin/Koin.kt

```kotlin
package com.premierdarkcoffee.tourism


fun Application.configureKoin() {
    install(Koin) {
        slf4jLogger()
        modules(module {
            single<HelloService> {
                HelloService {
                    println(environment.log.info("Hello, World!"))
                }
            }
        })
    }
}

```

---

# src/main/kotlin/Routing.kt

```kotlin
package com.premierdarkcoffee.tourism


fun Application.configureRouting() {
    val appClassLoader = environment.classLoader

    routing {
        htmlPage("/", "static/index.html", appClassLoader)
        htmlPage("/about", "static/about.html", appClassLoader)
        htmlPage("/privacy", "static/privacy.html", appClassLoader)
        htmlPage("/privacy-policy", "static/privacy.html", appClassLoader)
        htmlPage("/terms", "static/terms.html", appClassLoader)
        htmlPage("/terms-and-conditions", "static/terms.html", appClassLoader)

        get("/health") {
            call.respondText(
                text = """{"status":"ok","service":"altos-del-murco-web"}""",
                contentType = ContentType.Application.Json
            )
        }

        staticResources("/static", "static")
    }
}

private fun Route.htmlPage(
    path: String,
    resourcePath: String,
    classLoader: ClassLoader
) {
    get(path) {
        val html = classLoader.getResource(resourcePath)?.readText()

        if (html == null) {
            call.respond(HttpStatusCode.NotFound, "Page not found")
            return@get
        }

        call.respondText(
            text = html,
            contentType = ContentType.Text.Html.withCharset(Charsets.UTF_8)
        )
    }
}

```

---

# src/main/kotlin/Serialization.kt

```kotlin
package com.premierdarkcoffee.tourism


fun Application.configureSerialization() {
    install(ContentNegotiation) {
    }
}

```

---

# src/main/kotlin/main.kt

```kotlin
package com.premierdarkcoffee.tourism

fun main(args: Array<String>) {
    io.ktor.server.netty.EngineMain.main(args)
}

```

---

# src/test/kotlin/ServerTest.kt

```kotlin
package com.premierdarkcoffee.tourism


class ServerTest {

    @Test
    fun `test root endpoint`() = testApplication {
        // loads default configuration
        configure()
        // verify server root returns 200
        assertEquals(HttpStatusCode.OK, client.get("/").status)
    }

}

```

---

