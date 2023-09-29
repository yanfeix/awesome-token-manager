package com.awesome.www.controllers;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.util.Arrays;

@WebMvcTest(IndexController.class)
public class
TestIndexController {

    @Autowired
    private MockMvc mvc;

    @Test
    public void returnValidAfterValidation() throws Exception {
        mvc.perform(MockMvcRequestBuilders
                .get("/api/validator/tokens/8888-8888-8888-8888/status")
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.jsonPath("$.valid", true).exists())
                .andExpect(MockMvcResultMatchers.status().isOk());
    }

    @Test
    public void returnInvalidAfterValidation() throws Exception {
        mvc.perform(MockMvcRequestBuilders
                        .get("/api/validator/tokens/8888-8888-8888-8882/status")
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.jsonPath("$.valid",false).exists())
                .andExpect(MockMvcResultMatchers.status().isOk());
    }

    @Test
    public void throwBadRequest() throws Exception {
        mvc.perform(MockMvcRequestBuilders
                        .get("/api/validator/tokens/8888-8888-dddd/status")
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.status().isBadRequest());
    }
}
