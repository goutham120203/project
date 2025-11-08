package context;

import java.util.HashMap;
import java.util.Map;

public class TestContext {
    private static Map<String, String> storedData = new HashMap<>();

    public static void saveData(Map<String, String> data){
        storedData = new HashMap<>(data);
    }

    public static Map<String, String> getAll(){
        return storedData;
    }

    public static String get(String key){
        return storedData.get(key);
    }

    public static void clear(){
        storedData.clear();
    }
}
