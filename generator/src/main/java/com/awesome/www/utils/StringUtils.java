package com.awesome.www.utils;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import java.util.stream.Collectors;

public class StringUtils {
    public static String generateToken(String alphabets, int groups, int sizePerGroup, String delimiter) {
        List<String> randomStrings = new ArrayList();
        for (int i=0; i< groups; i++) {
            String randomString = generateRandomString(alphabets, sizePerGroup);
            randomStrings.add(randomString);
        }
        return  String.join(delimiter, randomStrings);
    }

    private static String generateRandomString(String alphabets, int targetSize) {
        final int alphabetsLength = alphabets.length();
        Random random = new Random();
        StringBuilder sb = new StringBuilder();
        for (int i=0; i< targetSize; i++) {
            sb.append(alphabets.charAt(random.nextInt(alphabetsLength)));
        }
        return sb.toString();
    }
    public static boolean hasDuplicates(List<String> strings) {
        List<String> distinct = strings.stream().distinct().collect(Collectors.toList());
        return distinct.size() < strings.size();
    }
    public static boolean hasDigitsOnly(String str) {
        for (int i = 0; i < str.length(); i++) {
            if (str.charAt(i) < '0' || str.charAt(i) > '9') {
                return false;
            }
        }
        return true;
    }
}
