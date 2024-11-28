import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import Card from './Card';

const meta: Meta<typeof Card> = {
  title: 'UI/List-Item/Card',
  component: Card,
};

export default meta;
type Story = StoryObj<typeof Card>;

function StoryCardList() {
  const [cardList, setCardList] = useState<
    {
      id: string;
      title: string;
      createdDate: string;
      isActive: boolean;
      isSelected: boolean;
      route: string;
      isChecked: boolean;
    }[]
  >([
    {
      title: '피치마켓 (peach market)',
      id: '1',
      isChecked: false,
      createdDate: '2023-11-01',
      isActive: true,
      isSelected: true,
      route: '/asd',
    },
    {
      title: '관치금융',
      id: '2',
      isChecked: false,
      createdDate: '2023-11-01',
      isActive: false,
      isSelected: false,
      route: '/asd',
    },
  ]);

  const toggleCheck = (id: string) => {
    setCardList(
      cardList.map((card) => {
        if (card.id === id) {
          return { ...card, isChecked: !card.isChecked };
        }
        return card;
      }),
    );
  };

  return (
    <ul className="space-y-4">
      {cardList.map((card) => {
        return (
          <li key={card.id}>
            <Card
              id={card.id}
              koreanTitle={card.title}
              createdDate={card.createdDate}
              isActive={card.isActive}
              isChecked={card.isChecked}
              route={card.route}
              isSelected={card.isSelected}
              onChangeChecked={toggleCheck}
            />
          </li>
        );
      })}
    </ul>
  );
}

export const SelectedCard: Story = {
  args: {
    koreanTitle: '피치마켓 (peach market)',
    id: '1',
    createdDate: '2023-11-01',
    isActive: true,
    isSelected: true,
    route: '/asd',
  },
};

export const UnselectedCard: Story = {
  args: {
    koreanTitle: '관치금융',
    id: '2',
    createdDate: '2023-11-01',
    isActive: false,
    isSelected: false,
    route: '/asd',
  },
};

export const CardList: Story = {
  render: () => {
    return <StoryCardList />;
  },
};
