import type { VocabularyState } from '@/types';
import { Box, Fade } from '@mui/material';

import { FADE_TIMEOUT } from '../constants';
import type { FamiliarityLevel } from '../types';
import GroupColorButton from './GroupColorButton';
import VocabularyCard from './VocabularyCard';

interface VocabularyGridProps {
  vocabularyList: VocabularyState[];
  onDeleteVocabulary: (vocabulary: VocabularyState) => void;
  onChangeColor: (vocabularyId: string, newColor: FamiliarityLevel) => void;
}

const VocabularyGrid: React.FC<VocabularyGridProps> = ({
  vocabularyList,
  onDeleteVocabulary,
  onChangeColor,
}) => {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: {
          xs: '1fr',
          sm: 'repeat(2, 1fr)',
          md: 'repeat(3, 1fr)',
          lg: 'repeat(4, 1fr)',
          xl: 'repeat(5, 1fr)',
        },
        gap: 3,
        gridAutoRows: 'min-content',
      }}
    >
      {vocabularyList.map((vocabularyInput, index) => (
        <Fade
          key={vocabularyInput.id}
          in
          timeout={FADE_TIMEOUT.CARD_BASE + index * FADE_TIMEOUT.CARD_DELAY}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              height: '100%',
            }}
          >
            <Box sx={{ flex: 1 }}>
              <VocabularyCard
                vocabularyInput={vocabularyInput}
                onConfirm={onDeleteVocabulary}
              />
            </Box>
            <Box
              sx={{
                mt: 2,
                minHeight: 80, // 確保有足夠空間顯示按鈕
                width: '100%',
              }}
            >
              <GroupColorButton
                currentColor={vocabularyInput.familiar}
                onChangeColor={(color) =>
                  onChangeColor(vocabularyInput.id, color as FamiliarityLevel)
                }
              />
            </Box>
          </Box>
        </Fade>
      ))}
    </Box>
  );
};

export default VocabularyGrid;
