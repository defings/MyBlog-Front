<template>
    <div
        class="mt-[32px] hover:border-black block p-6 dark:text-white text-[#1D1D1D] bg-[#FAFAFA] rounded-lg dark:bg-[#3A3A3A]">
        <div class="flex font-[DINPro] gap-8">
            <div class="ml-2">{{ dateObj.ny }}</div>
            <div>甲辰龙年 三月初七</div>
        </div>
        <div class="flex gap-8 font-[DINPro]">
            <div class="font-[DINPro] text-[60pt]">{{ dateObj.r }}</div>
            <div class="mt-6">
                <div class="text-xl">{{ dateObj.nl.ncWeek }}</div>
            </div>
        </div>
        <hr class="h-px bg-gray-200 border-0 dark:bg-white">
        <div class="text-sm mt-4 font-[DINPro] dark:text-[#D8D8D8]">
            <div class="mt-2">粗茶淡饭不要紧，朋友散场没关系</div>
            <div class="mt-2">兵荒马乱也无所谓</div>
            <div class="mt-2">只要你拥有热气腾腾的灵魂，日子就不会差</div>
        </div>
    </div>
</template>


<script setup>

</script>