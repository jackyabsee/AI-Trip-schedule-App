// src/components/schedule/ScheduleDetail.tsx
import React, { useState, useEffect, useMemo } from 'react';
import { ScrollView, StyleSheet, View, Text, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import ScheduleHeader from './ScheduleHeader';
import ScheduleTimeline from './ScheduleTimeline';
import { ScheduleItem } from '../../types';
import { updateSchedulePayload } from '../../services/api'; 
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import { useAuthStore } from '../../store/useAuthStore';
import { Ionicons } from '@expo/vector-icons';

interface Props {
  title?: string;
  startDate?: string;
  endDate?: string;
  numTourists?: number;
  summary?: string;
  schedule?: any[]; 
  hotels?: any[];
  persistedId?: number | string | null;
  rawPayload?: any; 
}

export default function ScheduleDetail({
  title, startDate, endDate, numTourists, summary, schedule, persistedId, rawPayload
}: Props) {
  const [localSchedule, setLocalSchedule] = useState<any[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  
  const [activeDayIndex, setActiveDayIndex] = useState(0);
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    if (schedule) setLocalSchedule(schedule);
  }, [schedule]);

  // 1. 判斷結構與分組
  const isNested = localSchedule.length > 0 && Array.isArray(localSchedule[0]?.activities);

  const daysArray = useMemo(() => {
    if (!localSchedule || localSchedule.length === 0) return [];
    if (isNested) return localSchedule;

    const grouped = new Map<number, any>();
    localSchedule.forEach((item) => {
      const d = item.day || 1;
      if (!grouped.has(d)) {
        grouped.set(d, { day: d, activities: [] });
      }
      grouped.get(d).activities.push(item);
    });
    
    return Array.from(grouped.values()).sort((a, b) => a.day - b.day);
  }, [localSchedule, isNested]);

  // 決定當前畫面顯示的行程 (UI 使用)
  const currentDay = daysArray[activeDayIndex] || daysArray[0] || { day: 1, activities: [] };
  const currentActivities = currentDay.activities || [];

  // 編輯邏輯
  const handleTimelineChange = (updatedActivities: any[]) => {
    if (isNested) {
      const newSchedule = [...localSchedule];
      newSchedule[activeDayIndex] = { ...newSchedule[activeDayIndex], activities: updatedActivities };
      setLocalSchedule(newSchedule);
    } else {
      const currentDayNum = currentDay.day;
      const stampedActivities = updatedActivities.map(act => ({ ...act, day: currentDayNum }));
      const otherDaysActivities = localSchedule.filter(act => (act.day || 1) !== currentDayNum);
      setLocalSchedule([...otherDaysActivities, ...stampedActivities].sort((a, b) => (a.day || 1) - (b.day || 1)));
    }
  };

  const handleAddNewDay = () => {
    if (isNested) {
      const newDayNum = daysArray.length > 0 ? daysArray[daysArray.length - 1].day + 1 : 1;
      const newSchedule = [...localSchedule, { day: newDayNum, activities: [] }];
      setLocalSchedule(newSchedule);
      setActiveDayIndex(newSchedule.length - 1);
    } else {
      const newDayNum = daysArray.length > 0 ? daysArray[daysArray.length - 1].day + 1 : 1;
      const newSchedule = [...localSchedule, { day: newDayNum, time: '10:00', placeName: '新地點', activities: '' }];
      setLocalSchedule(newSchedule);
      setActiveDayIndex(daysArray.length);
    }
  };

  const handleSave = async () => {
    if (!persistedId) {
      Alert.alert("錯誤", "無法儲存未同步的行程，請先登入或將此行程匯出。");
      return;
    }

    setIsSaving(true);
    try {
      const updatedPayload = { ...rawPayload, schedule: localSchedule };
      await updateSchedulePayload(String(persistedId), updatedPayload);
      Alert.alert("成功", "行程已成功更新！");
      setIsEditing(false);
    } catch (error: any) {
      Alert.alert("錯誤", error.message || "行程更新失敗。");
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    if (schedule) setLocalSchedule(schedule);
    setIsEditing(false);
  };

  // 匯出 PDF 邏輯
  const handleExportPDF = async () => {
    if (!user) {
      Alert.alert("需要登入", "請先建立免費帳戶或登入以將行程匯出為 PDF。");
      return;
    }

    setIsExporting(true);
    try {
      // 確保這裡使用的是 `daysArray` 來遍歷所有天數，而不是 `currentActivities`
      const allDaysHTML = daysArray.map((dayObj: any, index: number) => `
        <div class="day-card">
          <div class="day-title">Day ${dayObj.day || (index + 1)}</div>
          ${(dayObj.activities || []).map((act: any) => `
            <div class="activity">
              <span class="time">${act.time || ''}</span> 
              <span class="place">${act.placeName || act.locationName || '活動'}</span>
              ${act.address ? `<div class="address">📍 ${act.address}</div>` : ''}
              <div class="desc">${act.activities || act.description || ''}</div>
              ${act.notes ? `<div class="desc"><em>備註：${act.notes}</em></div>` : ''}
            </div>
          `).join('')}
        </div>
      `).join('');

      const htmlContent = `
        <html>
          <head>
            <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
            <meta charset="utf-8" />
            <style>
              body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #111827; padding: 30px; }
              h1 { color: #0B51F1; margin-bottom: 5px; }
              .meta { color: #6B7280; font-size: 14px; margin-bottom: 20px; border-bottom: 2px solid #EEF2FF; padding-bottom: 20px; }
              .summary { color: #374151; line-height: 1.6; margin-bottom: 30px; }
              .day-card { page-break-inside: avoid; border: 1px solid #E6E9F2; border-radius: 12px; margin-bottom: 24px; padding: 20px; background-color: #FAFAFA; }
              .day-title { font-size: 20px; font-weight: bold; color: #111827; border-bottom: 2px solid #E6E9F2; padding-bottom: 10px; margin-bottom: 16px; }
              .activity { margin-bottom: 16px; padding-left: 10px; border-left: 3px solid #0B51F1; }
              .time { font-weight: bold; color: #0B51F1; display: inline-block; width: 60px; vertical-align: top; }
              .place { font-weight: bold; font-size: 16px; color: #111827; }
              .address { color: #6B7280; font-size: 13px; margin-top: 4px; display: block; margin-left: 64px; }
              .desc { color: #4B5563; font-size: 14px; margin-top: 6px; line-height: 1.4; margin-left: 64px; }
            </style>
          </head>
          <body>
            <h1>${title || '我的專屬旅遊行程'}</h1>
            <div class="meta">
              <strong>日期：</strong> ${startDate || '未定'} 至 ${endDate || '未定'} &nbsp;|&nbsp; 
              <strong>人數：</strong> ${numTourists || 1}
            </div>
            <div class="summary">${summary || ''}</div>
            
            ${allDaysHTML}

          </body>
        </html>
      `;

      const { uri } = await Print.printToFileAsync({ html: htmlContent, base64: false });
      await Sharing.shareAsync(uri, { UTI: '.pdf', mimeType: 'application/pdf', dialogTitle: '匯出旅遊行程' });
    } catch (error) {
      console.error(error);
      Alert.alert('匯出失敗', '無法產生 PDF 檔案。');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ScheduleHeader title={title} startDate={startDate} endDate={endDate} numTourists={numTourists} summary={summary} />

        <View style={styles.actionBar}>
          <Text style={styles.actionTitle}>行程總覽</Text>
          
          {isEditing ? (
            <View style={{ flexDirection: 'row', gap: 10 }}>
              <TouchableOpacity onPress={handleCancel} style={styles.cancelBtn}>
                <Text style={styles.cancelText}>取消</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleSave} style={styles.saveBtn} disabled={isSaving}>
                {isSaving ? <ActivityIndicator size="small" color="#fff" /> : <Text style={styles.saveText}>儲存</Text>}
              </TouchableOpacity>
            </View>
          ) : (
            <View style={{ flexDirection: 'row', gap: 10 }}>
              <TouchableOpacity onPress={handleExportPDF} style={styles.exportBtn} disabled={isExporting}>
                {isExporting ? <ActivityIndicator size="small" color="#0B51F1" /> : (
                  <>
                    <Ionicons name="download-outline" size={16} color="#0B51F1" />
                    <Text style={styles.exportText}>匯出 PDF</Text>
                  </>
                )}
              </TouchableOpacity>
              
              <TouchableOpacity onPress={() => setIsEditing(true)} style={styles.editBtn}>
                <Ionicons name="pencil-outline" size={16} color="#4B5563" />
                <Text style={styles.editText}>編輯</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* --- 標籤列 (Tabs) --- */}
        <View style={styles.tabsWrapper}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabsContainer}>
            {daysArray.map((dayObj: any, index: number) => {
              const isActive = index === activeDayIndex;
              return (
                <TouchableOpacity 
                  key={index} 
                  style={[styles.tabBtn, isActive && styles.tabBtnActive]}
                  onPress={() => setActiveDayIndex(index)}
                >
                  <Text style={[styles.tabText, isActive && styles.tabTextActive]}>
                    Day {dayObj.day || index + 1}
                  </Text>
                </TouchableOpacity>
              );
            })}
            
            {isEditing && (
              <TouchableOpacity style={styles.addDayBtn} onPress={handleAddNewDay}>
                <Ionicons name="add" size={16} color="#0B51F1" />
                <Text style={styles.addDayText}>新增一天</Text>
              </TouchableOpacity>
            )}
          </ScrollView>
        </View>

        {/* --- 行程時間軸內容 (只顯示目前選中的 Tab) --- */}
        {currentActivities && currentActivities.length > 0 ? (
          <ScheduleTimeline schedule={currentActivities} editable={isEditing} onChange={handleTimelineChange} />
        ) : (
          <View style={styles.emptyDay}>
            <Text style={styles.emptyDayText}>這一天還沒有任何行程安排。</Text>
            {isEditing && (
              <TouchableOpacity style={styles.addFirstBtn} onPress={() => handleTimelineChange([{ time: '10:00', placeName: '新地點', activities: '' }])}>
                 <Text style={styles.addFirstBtnText}>+ 加入第一個行程</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F7F8FD' },
  actionBar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 18, paddingVertical: 12, backgroundColor: '#fff', borderBottomWidth: 1, borderColor: '#E6E9F2' },
  actionTitle: { fontSize: 18, fontWeight: '700', color: '#111827' },
  
  exportBtn: { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: '#EEF2FF', paddingHorizontal: 14, paddingVertical: 8, borderRadius: 8 },
  exportText: { color: '#0B51F1', fontWeight: '600' },
  editBtn: { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: '#F3F4F6', paddingHorizontal: 14, paddingVertical: 8, borderRadius: 8 },
  editText: { color: '#4B5563', fontWeight: '600' },
  saveBtn: { backgroundColor: '#0B51F1', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 8, minWidth: 64, alignItems: 'center' },
  saveText: { color: '#fff', fontWeight: '600' },
  cancelBtn: { backgroundColor: '#F3F4F6', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 8 },
  cancelText: { color: '#4B5563', fontWeight: '600' },

  tabsWrapper: { backgroundColor: '#fff', borderBottomWidth: 1, borderColor: '#E6E9F2' },
  tabsContainer: { paddingHorizontal: 14, paddingVertical: 8, alignItems: 'center' },
  tabBtn: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, marginHorizontal: 4, backgroundColor: '#F3F4F6' },
  tabBtnActive: { backgroundColor: '#0B51F1' },
  tabText: { color: '#4B5563', fontWeight: '600', fontSize: 14 },
  tabTextActive: { color: '#fff' },
  
  addDayBtn: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 20, marginHorizontal: 4, borderWidth: 1, borderColor: '#0B51F1', borderStyle: 'dashed' },
  addDayText: { color: '#0B51F1', fontWeight: '600', fontSize: 14, marginLeft: 2 },
  
  emptyDay: { padding: 40, alignItems: 'center', justifyContent: 'center' },
  emptyDayText: { color: '#6B7280', fontSize: 15, marginBottom: 16 },
  addFirstBtn: { backgroundColor: '#EEF2FF', paddingHorizontal: 16, paddingVertical: 10, borderRadius: 8 },
  addFirstBtnText: { color: '#0B51F1', fontWeight: '700' }
});