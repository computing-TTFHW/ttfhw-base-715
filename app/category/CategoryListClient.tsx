'use client'

import { RepoSummary } from '@/lib/types'
import { RepoTable } from '@/components/summary/RepoTable'
import { FilterBar } from '@/components/summary/FilterBar'
import { useState } from 'react'

interface CategoryListClientProps {
  repos: RepoSummary[]
}

export function CategoryListClient({ repos }: CategoryListClientProps) {
  const [filteredRepos, setFilteredRepos] = useState<RepoSummary[]>(repos)

  return (
    <>
      {/* 筛选栏 */}
      <FilterBar repos={repos} onFilter={setFilteredRepos} />

      {/* 仓库表格 — 与首页完全相同的样式 */}
      <div className="mt-4 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
        <RepoTable repos={filteredRepos} />
      </div>
    </>
  )
}
