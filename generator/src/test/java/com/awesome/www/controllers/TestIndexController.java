package com.awesome.www.controllers;

import com.awesome.www.models.GeneratorRequestPayload;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.util.ArrayList;
import java.util.Arrays;

@WebMvcTest(IndexController.class)
public class
TestIndexController {

    @Autowired
    private MockMvc mvc;

    public static String asJsonString(final Object obj) {
        try {
            return new ObjectMapper().writeValueAsString(obj);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
    @Test
    public void createValidToken() throws Exception {
        mvc.perform(MockMvcRequestBuilders
                .post("/api/generator/tokens")
                .content(
                       asJsonString(GeneratorRequestPayload
                                .builder()
                                .digits(Arrays.asList("1", "2"))
                                .build()
                        ))
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.jsonPath("$.token").exists())
                .andExpect(MockMvcResultMatchers.status().isCreated());
    }

    @Test
    public void throwBadRequest() throws Exception {
        mvc.perform(MockMvcRequestBuilders
                        .post("/api/generator/tokens")
                        .content(
                                asJsonString(GeneratorRequestPayload
                                        .builder()
                                        .digits(Arrays.asList("1", "1"))
                                        .build()
                                ))
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.status().isBadRequest());
    }
}
