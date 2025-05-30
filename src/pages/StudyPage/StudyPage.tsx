import { useNavigate } from 'react-router-dom';

import PageLayout from '@/components/shared/PageLayout/PageLayout';
import { VocabularyState } from '@/types';
import { Box, Container } from '@mui/material';

import EmptyState from './components/EmptyState';
import FilterSection from './components/FilterSection';
import StatisticsCard from './components/StatisticsCard';
import VocabularyGrid from './components/VocabularyGrid';
import { useStatistics, useVocabularyData, useVocabularyFilter } from './hooks';

const StudyPage = () => {
  const navigate = useNavigate();

  // 詞彙資料管理
  const { allVocabulary, deleteVocabulary, changeVocabularyColor } =
    useVocabularyData();

  // 篩選邏輯
  const { colors, filteredVocabulary, handleAutocompleteChange } =
    useVocabularyFilter(allVocabulary);

  // 統計資料
  const statisticsData = useStatistics(allVocabulary, filteredVocabulary);

  // 導航處理
  const handleGoBack = () => {
    navigate(-1);
  };

  const handleCancel = () => {
    navigate('/');
  };

  const hasFilter = colors.length > 0;
  const isEmpty = filteredVocabulary.length === 0;

  return (
    <PageLayout
      title="單字學習"
      onGoBack={handleGoBack}
      onCancel={handleCancel}
      maxWidth="xl"
    >
      <Container maxWidth="xl" sx={{ px: { xs: 2, sm: 3 } }}>
        {/* 頂部統計卡片 */}
        <StatisticsCard statisticsData={statisticsData} hasFilter={hasFilter} />

        {/* 過濾器區域 */}
        <FilterSection
          colors={colors}
          onAutocompleteChange={handleAutocompleteChange}
        />

        {/* 單字卡片網格或空狀態 */}
        <Box>
          {isEmpty ? (
            <EmptyState hasFilter={hasFilter} />
          ) : (
            <VocabularyGrid
              vocabularyList={filteredVocabulary}
              onDeleteVocabulary={deleteVocabulary}
              onChangeColor={changeVocabularyColor}
            />
          )}
        </Box>
      </Container>
    </PageLayout>
  );
};

export default StudyPage;
