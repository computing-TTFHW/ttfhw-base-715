import { getAllRepoSummaries } from '@/lib/data-loader'
import { CategoryListClient } from '../CategoryListClient'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>
}) {
  const { category } = await params
  const decoded = decodeURIComponent(category)
  const allRepos = getAllRepoSummaries()

  // 过滤：实际分类匹配，或 "other" 匹配未分类仓库
  const repos =
    decoded === 'other'
      ? allRepos.filter((r) => !r.category)
      : allRepos.filter((r) => r.category === decoded)

  if (repos.length === 0) {
    notFound()
  }

  // 分类页面的显示名：other → "其他"
  const displayCategory = decoded === 'other' ? '其他' : decoded

  return (
    <main className="mx-auto w-full max-w-screen-2xl px-6 py-8 xl:px-8">
      {/* 页面标题 */}
      <header className="mb-8 border-b border-slate-200 pb-5">
        <div className="flex items-center gap-3 mb-1">
          <Link
            href="/"
            className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-slate-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            返回总览
          </Link>
        </div>
        <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
          {displayCategory} 仓库列表
        </h1>
        <p className="text-slate-500 mt-2">
          TTFHW仓库编译验证结果 — 共 {repos.length} 个仓库
        </p>
      </header>

      {/* 表格区域（无图表） */}
      <CategoryListClient repos={repos} />
    </main>
  )
}

export function generateStaticParams() {
  const allRepos = getAllRepoSummaries()
  const categories = new Set<string>()

  for (const repo of allRepos) {
    if (repo.category) {
      categories.add(repo.category)
    }
  }

  const params = Array.from(categories).map((cat) => ({ category: cat }))

  // 如果有未分类的仓库，添加 "other"
  const hasUncategorized = allRepos.some((r) => !r.category)
  if (hasUncategorized) {
    params.push({ category: 'other' })
  }

  return params
}
