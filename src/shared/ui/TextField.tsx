import { ComponentProps } from 'react';
import { colors, Flex, TextField as TosslibTextField } from 'tosslib';

const ERROR_MESSAGE_HEIGHT = '16px';

interface TextFieldProps extends ComponentProps<typeof TosslibTextField> {
  errorMessage?: string;
}

export function TextField({ errorMessage, ...rests }: TextFieldProps) {
  return (
    <Flex direction="column">
      <TosslibTextField {...rests} />
      {/* 에러메세지가 생길 때 컴포넌트 높이가 바뀌지 않게 처리하기 위해 height를 고정 */}
      <p
        role="alert"
        css={{
          fontSize: '12px',
          lineHeight: ERROR_MESSAGE_HEIGHT,
          padding: '0 20px',
          color: colors.red600,
          margin: 0,
          height: ERROR_MESSAGE_HEIGHT,
        }}
      >
        {errorMessage}
      </p>
    </Flex>
  );
}
