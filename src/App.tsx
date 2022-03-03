import { Button, Center, Flex, Heading, Textarea } from "@chakra-ui/react";
import { useEffect, useRef } from "react";
import { useCookies } from "react-cookie";

const shuffleArray = (array: any[]) => {
  const cloneArray = [...array];

  const result = cloneArray.reduce((_, cur, idx) => {
    let rand = Math.floor(Math.random() * (idx + 1));
    cloneArray[idx] = cloneArray[rand];
    cloneArray[rand] = cur;
    return cloneArray;
  });

  return result;
};

function App() {
  const [cookies, setCookie] = useCookies();
  const inputEl = useRef<HTMLTextAreaElement>(null);
  const outputEl = useRef<HTMLTextAreaElement>(null);

  const handleShuffle = () => {
    if (inputEl.current && outputEl.current) {
      const srcArray = inputEl.current.value
        .split(/\n/)
        .map((e) => e.trim())
        .filter((e) => e.length > 0);

      outputEl.current.value = shuffleArray(srcArray).join("\n");
    }
  };

  const handleReset = () => {
    if (inputEl.current) {
      inputEl.current.value = "";
    }
    if (outputEl.current) {
      outputEl.current.value = "";
    }
  };

  const handleSave = () => {
    if (inputEl.current) {
      setCookie("input", inputEl.current.value);
    }
  };

  useEffect(() => {
    if (cookies.input && inputEl.current) {
      inputEl.current.value = cookies.input;
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Flex minH="100vh" direction="column" px={4}>
      <Center>
        <Heading>行シャッフル</Heading>
      </Center>
      <Textarea flexGrow="1" my={4} resize="vertical" ref={inputEl} />
      <Center>
        <Button mx={4} colorScheme="blue" onClick={handleShuffle}>
          シャッフル
        </Button>
        <Button mx={4} colorScheme="gray" onClick={handleReset}>
          リセット
        </Button>
        <Button mx={4} colorScheme="teal" onClick={handleSave}>
          クッキーに保存
        </Button>
      </Center>
      <Textarea flexGrow="1" my={4} resize="vertical" ref={outputEl} />
    </Flex>
  );
}

export default App;
