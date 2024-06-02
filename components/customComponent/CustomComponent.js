import { ToggleGroup, styled } from 'tamagui';

const MyToggleGroupItem = styled(ToggleGroup.Item, {
    backgroundColor: 'rgb(245, 245, 245)',
    paddingVertical: 14,
    paddingHorizontal: 22,
    variants: {
        active: {
            true: {
                backgroundColor: 'rgb(231, 243, 239)',
                borderColor: 'rgb(23, 162, 96)',
                borderWidth: 1.7,
            },
        },
    },
});

const MyToggleGroupItemSm = styled(ToggleGroup.Item, {
    backgroundColor: 'rgb(245, 245, 245)',
    paddingVertical: 8,
    paddingHorizontal: 12,
    variants: {
        active: {
            true: {
                backgroundColor: 'rgb(231, 243, 239)',
                borderColor: 'rgb(23, 162, 96)',
                borderWidth: 1.7,
            },
        },
    },
});


export { MyToggleGroupItem, MyToggleGroupItemSm };
