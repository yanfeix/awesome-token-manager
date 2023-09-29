package com.awesome.www.utils;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

import java.util.Arrays;

public class TestStringUtils {

    @Test
    void hasDigitsOnly() {
        Assertions.assertTrue(StringUtils.hasDigitsOnly("123"));
        Assertions.assertFalse(StringUtils.hasDigitsOnly("abc1"));
    }
}
