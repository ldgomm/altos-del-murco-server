package com.premierdarkcoffee.tourism

import io.ktor.http.ContentType
import io.ktor.http.HttpStatusCode
import io.ktor.http.withCharset
import io.ktor.server.application.Application
import io.ktor.server.response.respond
import io.ktor.server.response.respondText
import io.ktor.server.routing.Route
import io.ktor.server.routing.get
import io.ktor.server.routing.routing
import io.ktor.server.http.content.staticResources

fun Application.configureRouting() {
    val appClassLoader = environment.classLoader

    routing {
        htmlPage("/", "static/index.html", appClassLoader)
        htmlPage("/about", "static/about.html", appClassLoader)
        htmlPage("/privacy", "static/privacy.html", appClassLoader)
        htmlPage("/privacy-policy", "static/privacy.html", appClassLoader)
        htmlPage("/support", "static/support.html", appClassLoader)
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
