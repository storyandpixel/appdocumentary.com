require 'nokogiri'

module Jekyll
  class AnimatedSvg < Liquid::Tag

    def initialize(tag_name, svg_path, tokens)
      super
      absolute_svg_path = File.join(Jekyll.configuration['source'], svg_path.strip)
      @doc = Nokogiri.parse(File.read(absolute_svg_path))
    end

    def add_animated_class(svg_element)
      svg_element.add_class('animated')
    end

    def remove_extraneous_attrs(svg_element)
      extraneous_attrs = svg_element.first.attributes.keys - ['version', 'viewBox']
      extraneous_attrs.each {|attr| svg_element.first.remove_attribute(attr) }
    end

    def remove_style_tags(svg_element)
      svg_element.css('style').remove
    end

    def render(context)
      svg_element = @doc.css('svg')
      remove_style_tags(svg_element)
      remove_extraneous_attrs(svg_element)
      add_animated_class(svg_element)

      svg_element.
        to_xhtml.
        gsub(/>\s+</, "><")
    end
  end
end

Liquid::Template.register_tag('animated_svg', Jekyll::AnimatedSvg)
